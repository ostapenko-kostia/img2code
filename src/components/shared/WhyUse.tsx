import React from "react";
import { Container } from "./Container";
import {
    CircleCheckIcon,
    InfinityIcon,
    ShieldCheckIcon,
    ZapIcon,
} from "lucide-react";

const WhyUse: React.FC = () => {
    return (
        <section className="w-full py-24">
            <Container className="flex flex-col items-center gap-6">
                <h2 className="text-4xl font-bold">
                    Why use
                    <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        &nbsp;Img2code
                    </span>
                </h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-8 mt-10 max-w-[1000px]">
                    <div className="flex items-start gap-3">
                        <CircleCheckIcon
                            size={48}
                            className="bg-[#dcfce7] dark:bg-neutral-900 h-auto w-auto p-3 rounded-xl inline-block"
                        />
                        <div className="flex flex-col items-start gap-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200">
                                High-Quality Image Conversion
                            </h3>
                            <p className="text-gray-700 font-light dark:text-gray-500">
                                Our advanced AI ensures precise and reliable conversion of
                                images into clean, structured code.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ZapIcon
                            size={48}
                            className="bg-[#dcfce7] dark:bg-neutral-900 h-auto w-auto p-3 rounded-xl inline-block"
                        />
                        <div className="flex flex-col items-start gap-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200">
                                No Installation Needed
                            </h3>
                            <p className="text-gray-700 font-light dark:text-gray-500">
                                No downloads or setup required. Simply upload your image and
                                convert it to code instantly.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <InfinityIcon
                            size={48}
                            className="bg-[#dcfce7] dark:bg-neutral-900 h-auto w-auto p-3 rounded-xl inline-block"
                        />
                        <div className="flex flex-col items-start gap-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200">
                                Unlimited Access
                            </h3>
                            <p className="text-gray-700 font-light dark:text-gray-500">
                                Enjoy unlimited conversions with our premium plans, allowing you
                                to process as many images as you need.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ShieldCheckIcon
                            size={48}
                            className="bg-[#dcfce7] dark:bg-neutral-900 h-auto w-auto p-3 rounded-xl inline-block"
                        />
                        <div className="flex flex-col items-start gap-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-200">
                                Data Privacy and Security
                            </h3>
                            <p className="text-gray-700 font-light dark:text-gray-500">
                                We prioritize your privacy by not storing any images or
                                generated code, ensuring complete data protection.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WhyUse;
