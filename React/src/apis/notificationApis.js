import axios from 'axios';

// 최신 알림 3건 가져오기
export const fetchLatestNotifications = async () => {
    try {
        const response = await axios.get('/notification-cache/latest');
        return response.data;
    } catch (error) {
        console.error("Error fetching latest notifications:", error);
        throw error;
    }
};

// 알림 읽음 처리
export const markNotificationAsRead = async (notificationId) => {
    try {
        await axios.post(`/notification-cache/${notificationId}/read`);
    } catch (error) {
        console.error(`Error marking notification ${notificationId} as read:`, error);
        throw error;
    }
};