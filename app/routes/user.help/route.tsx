import type { Route } from "./+types/route";
import { Search, Book, MessageCircle, Play } from "lucide-react";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Help Center - CloudDriver" },
    { name: "description", content: "Help and support documentation" },
  ];
}

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    { id: 1, category: "Getting Started", title: "How do I create an account?", answer: "Visit our signup page and follow the registration steps..." },
    { id: 2, category: "Projects", title: "How do I start a new project?", answer: "Go to the Projects Catalog and click on any project..." },
    { id: 3, category: "Scoring", title: "How is my score calculated?", answer: "Your score is based on how well your configuration meets the requirements..." },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        <p className="mt-2 text-gray-600">Find answers to your questions</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" width={20} height={20} />
        <input 
          type="text" 
          placeholder="Search help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="#" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <Book className="text-blue-500 mb-3" width={28} height={28} />
          <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
          <p className="text-sm text-gray-600">Read comprehensive guides and tutorials</p>
        </a>
        <a href="#" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <Play className="text-purple-500 mb-3" width={28} height={28} />
          <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
          <p className="text-sm text-gray-600">Watch step-by-step video guides</p>
        </a>
        <a href="#" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <MessageCircle className="text-green-500 mb-3" width={28} height={28} />
          <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
          <p className="text-sm text-gray-600">Get help from our support team</p>
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(faq => (
            <details key={faq.id} className="border border-gray-200 rounded-lg p-4">
              <summary className="font-medium text-gray-900 cursor-pointer flex justify-between items-center">
                {faq.title}
                <span className="text-gray-500">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
