import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

function ContactPage() {

    const contactMethods = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone Support",
            info: "+20 1025926249",
            description: "Call us for immediate assistance",
            available: "24/7 Available"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email Support",
            info: "support@STPizza.com",
            description: "Send us your queries anytime",
            available: "Response within 2 hours"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Visit Us",
            info: "123 Food Street, Culinary District",
            description: "Our headquarters location",
            available: "Mon-Fri, 9 AM - 6 PM"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                        Have questions, feedback, or need help with your order? We{"'"}re here to help you 24/7.
                        Your satisfaction is our top priority.
                    </p>
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">How Can We Help?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                                <div className="text-red-600 mb-4">{method.icon}</div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{method.title}</h3>
                                <p className="text-gray-900 font-medium mb-2">{method.info}</p>
                                <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {method.available}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <Clock className="w-16 h-16 mx-auto mb-6" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">We{"'"}re Always Here</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left sm:text-center">
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Customer Support</h3>
                                <p className="opacity-90">24/7 Available</p>
                                <p className="text-sm opacity-75">Phone & Live Chat</p>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Order Support</h3>
                                <p className="opacity-90">24/7 Available</p>
                                <p className="text-sm opacity-75">App & Website</p>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Office Hours</h3>
                                <p className="opacity-90">Mon-Fri: 9 AM - 6 PM</p>
                                <p className="text-sm opacity-75">For partnerships & business</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ContactPage;
