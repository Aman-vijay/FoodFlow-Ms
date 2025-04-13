import React from 'react';
import { Link } from 'react-router-dom';

const Error: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                
                <img 
                    src="/assets/error.jpg" 
                    alt="Empty plate" 
                    className=" h-64 mx-auto my-6"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/250x250?text=Oops!";
                    }}
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-8">
                    We couldn't find the page you're looking for. Looks like someone ate it!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                        to="/" 
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Back to Home
                    </Link>
                    <Link 
                        to="/menu" 
                        className="px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
                    >
                        Browse Menu
                    </Link>
                </div>
            </div>
            <div className="mt-12 text-gray-500">
                <p>Hungry? Our food is just a click away. Don't let this error stop you!</p>
            </div>
        </div>
    );
};

export default Error;