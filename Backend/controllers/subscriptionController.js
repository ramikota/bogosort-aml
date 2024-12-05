const Subscription = require('../models/Subscription'); 


class SubController {
    static async getSubscription(req, res) {
        try {
            const { id: userId } = req.user; 

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const subscription = await Subscription.findByUserId(userId);

            if (!subscription || subscription.length === 0) {
                return res.status(404).json({ message: 'Subscription not found.' });
            }

            res.json({ subscription: subscription[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = SubController;