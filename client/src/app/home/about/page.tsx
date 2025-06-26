import React from 'react';
import { ChefHat, Clock, Shield, Heart, Star, Users, Truck, MapPin } from 'lucide-react';
import Link from "next/link";

function AboutPage() {
    const features = [
        { icon: <Clock className="w-6 h-6" />, title: "Fast Delivery", description: "Get your favorite meals delivered in 30 minutes or less" },
        { icon: <Shield className="w-6 h-6" />, title: "Safe & Secure", description: "Your personal information and payments are always protected" },
        { icon: <Star className="w-6 h-6" />, title: "Quality Assured", description: "We partner only with top-rated restaurants and verified chefs" },
        { icon: <Heart className="w-6 h-6" />, title: "Made with Love", description: "Every meal is prepared with care and attention to detail" }
    ];

    const stats = [
        { number: "10K+", label: "Happy Customers" },
        { number: "500+", label: "Restaurant Partners" },
        { number: "50+", label: "Cities Served" },
        { number: "99%", label: "Satisfaction Rate" }
    ];

    const team = [
        { name: "Sarah Johnson", role: "CEO & Founder", bio: "Former restaurant owner with 15+ years in the food industry" },
        { name: "Mike Chen", role: "Head of Operations", bio: "Logistics expert who ensures your food arrives fresh and fast" },
        { name: "Emily Rodriguez", role: "Customer Experience", bio: "Dedicated to making every order a delightful experience" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ChefHat className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-3xl sm:text-5xl font-bold mb-4">About ST PIZZA</h1>
                    <p className="text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
                        We{"'"}re revolutionizing food delivery by connecting food lovers with amazing local restaurants,
                        bringing delicious meals right to your doorstep with speed, quality, and care.
                    </p>
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Our Mission</h2>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                            To make great food accessible to everyone, anytime, anywhere...
                        </p>
                        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6 sm:p-8">
                            <p className="text-lg sm:text-xl font-semibold text-gray-800 italic">
                                {"\""}Food is not just sustenance – it{"'"}s culture, comfort, and connection...{"\""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-red-600 mb-4">{feature.icon}</div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Impact</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <div className="text-2xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                                <div className="text-sm sm:text-lg opacity-90">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <Users className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                                <p className="text-red-600 font-medium mb-2">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">1. Browse & Order</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Explore restaurants near you and order in a few taps</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <ChefHat className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">2. We Prepare</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Partner restaurants prepare meals with care</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Truck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">3. Fast Delivery</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Delivery partners bring it right to your door</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-base sm:text-xl mb-8">Join thousands of satisfied customers who trust us with their meals</p>
                    <div className="flex justify-center">
                        <Link href="/home/menu" className="bg-white text-red-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            ORDER NOW
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
