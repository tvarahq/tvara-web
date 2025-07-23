import React from "react";
import AboutSectionIll from "../assets/AboutSectionIll";

function About() {
  const data = [
    {
      title: "For Business Teams",
      desc: "Create AI workflows without writing code using our intuitive drag-and-drop interface."
    },
    {
      title: "For Developers",
      desc: "Build sophisticated AI agents with our comprehensive SDK and extensive customization options."
    },
    {
      title: "For Startups & Enterprises",
      desc: "Scale your operations efficiently with AI-powered automation that grows with your business."
    }
  ]
  return (
    <section className="py-20 ">
      <div className="gap-12 mx-auto px-4">
        {/* Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
              AI Workflows for Everyone
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tvara Studios bridges the gap between powerful AI capabilities and ease of use.
              Whether you're a developer building custom solutions or a business user automating
              workflows, we've got you covered.
            </p>
          </div>

          <div className="flex">
            <div className="space-y-6">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-100 hover:border-blue-200 transition-colors">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* SVG Illustration */}
          <div>
            <AboutSectionIll />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
