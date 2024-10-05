const aws = require('aws-sdk');
const Video = require('../models/Video');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

class VideoStreamingService {
    constructor() {
        this.s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
    }
    async getSignedUrl(videoId, userId) {
        try {
            const video = await Video.findById(videoId).populate('course');
            if (!video) {
                throw new Error('Video not found');
            }
            // Check if the user is enrolled in the course or if it's a free course
            const isEnrolled = await Enrollment.findOne({ user: userId, course: video.course._id });
            if (!isEnrolled && video.course.isPaid) {
                throw new Error('User not enrolled in this course');
            }
            const params = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: video.url,
                Expires: 3600, // URL expires in 1 hour
            };
            return this.s3.getSignedUrl('getObject', params);
        } catch (error) {
            console.error('Error getting signed URL:', error);
            throw error;
        }
    }
    async uploadVideo(file, courseId, videoData) {
        try {
            const course = await Course.findById(courseId);
            if (!course) {
                throw new Error('Course not found');
            }
            const params = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: `courses/${courseId}/videos/${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const uploadResult = await this.s3.upload(params).promise();
            const video = new Video({
                title: videoData.title,
                description: videoData.description,
                course: courseId,
                url: uploadResult.Key,
                duration: videoData.duration,
                order: videoData.order,
            });
            await video.save();
            return video;
        } catch (error) {
            console.error('Error uploading video:', error);
            throw error;
        }
    }
    async deleteVideo(videoId) {
        try {
            const video = await Video.findById(videoId);
            if (!video) {
                throw new Error('Video not found');
            }
            const params = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: video.url,
            };
            await this.s3.deleteObject(params).promise();
            await Video.findByIdAndDelete(videoId);
            return { message: 'Video deleted successfully' };
        } catch (error) {
            console.error('Error deleting video:', error);
            throw error;
        }
    }
    async getVideoInfo(videoId) {
        try {
            const video = await Video.findById(videoId).populate('course', 'title');
            if (!video) {
                throw new Error('Video not found');
            }
            return video;
        } catch (error) {
            console.error('Error getting video info:', error);
            throw error;
        }
    }
}

module.exports = new VideoStreamingService();