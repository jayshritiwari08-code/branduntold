import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // Mock data - replace with actual CMS fetch
    const articlesData = [
      {
        id: "6a1487dc681c890767fd3c5a",
        title: "How to Find Your Brand's Unique Voice",
        tagline: "CRAFT YOUR BRAND VOICE",
        description: "In 2008, Airbnb was struggling. The founders had maxed out their credit cards, were living on cereal",
        long_description: "<p>In 2008, Airbnb was struggling. The founders had maxed out their credit cards, were living on cereal, and had only made $200 in their first few months. But they didn't give up. Instead, they did something that would transform their business forever—they told a story.</p><p>This isn't just a tale of startup success. It's a masterclass in how authentic storytelling can build trust, create emotional connections, and turn a struggling idea into a global phenomenon.</p><h2><strong>The Problem: No One Trusted Strangers</strong></h2><p>The fundamental challenge Airbnb faced was simple but daunting: why would anyone stay in a stranger's home? The concept violated basic human instincts about safety and trust. Traditional marketing couldn't overcome this barrier.</p><p>The founders realized they needed to change the narrative. Instead of focusing on the features of their platform, they needed to focus on the human stories behind every listing.</p><h2><strong>The Solution: Tell the Hosts' Stories</strong></h2><p>Airbnb began investing heavily in professional photography and storytelling. They didn't just show rooms—they showed the people who lived there. They shared the hosts' passions, their neighborhoods, and what made their spaces unique.</p><p>Each listing became a story. A musician's apartment in Brooklyn wasn't just a place to sleep—it was an invitation to experience New York through a local artist's eyes. A family home in Kyoto wasn't just accommodation—it was a chance to live like a local in ancient Japan.</p><h3><strong>The Impact of Authentic Storytelling</strong></h3><p>The results were dramatic. Bookings increased, trust was established, and Airbnb began its journey from struggling startup to a company valued at over $100 billion. The key insight was that people weren't just buying accommodation—they were buying experiences and connections.</p><h2><strong>Key Lessons for Your Brand</strong></h2><p>Airbnb's success offers several important lessons for anyone building a brand:</p><ul class=\"list-disc pl-6 space-y-1\"><li><p><strong>Trust is built through stories, not features:</strong> Technical specifications and feature lists don't create emotional connections. Stories do.</p></li><li><p><strong>Show the human side:</strong> People connect with people, not faceless corporations. Put the humans behind your brand front and center.</p></li><li><p><strong>Invest in quality presentation:</strong> Professional photography and well-crafted narratives signal that you care about the experience you're offering.</p></li><li><p><strong>Focus on the experience, not just the product:</strong> What will people feel, learn, or discover when they engage with your brand? That's your real story.</p></li></ul><h2><strong>Conclusion</strong></h2><p>Airbnb didn't succeed because they had a better booking system or more features than competitors. They succeeded because they understood that in the sharing economy, trust is the currency—and storytelling is how you earn it.</p><p>Your brand, no matter what industry you're in, can apply these same principles. Find the human stories behind what you do. Tell them authentically. Build trust through genuine connection. That's how you turn strangers into loyal customers.</p>",
        author: "Harshit Dhodi",
        date: "2026-05-23",
        created_at: "2026-05-25T17:33:16.285Z",
        updated_at: "2026-05-27T15:25:37.686Z",
        slug: "find-brand-unique-voice",
        category: "6a0f345f18153bfec723c178",
        image: "/uploads/1779895533434-dqfmcrdaiwi.png",
        category_populated: null,
        category_label: null
      },
      {
        id: "6a1487dc681c890767fd3c5b",
        title: "How Airbnb Used Storytelling to Build Trust",
        tagline: "THE BUILDERS BEHIND THE BRANDS",
        description: "A deep dive into how Airbnb transformed from a struggling startup to a household name through the power of authentic storytelling.",
        long_description: "<p>In 2008, Airbnb was struggling. The founders had maxed out their credit cards, were living on cereal, and had only made $200 in their first few months. But they didn't give up. Instead, they did something that would transform their business forever—they told a story.</p><p>This isn't just a tale of startup success. It's a masterclass in how authentic storytelling can build trust, create emotional connections, and turn a struggling idea into a global phenomenon.</p><h2><strong>The Problem: No One Trusted Strangers</strong></h2><p>The fundamental challenge Airbnb faced was simple but daunting: why would anyone stay in a stranger's home? The concept violated basic human instincts about safety and trust. Traditional marketing couldn't overcome this barrier.</p><p>The founders realized they needed to change the narrative. Instead of focusing on the features of their platform, they needed to focus on the human stories behind every listing.</p><h2><strong>The Solution: Tell the Hosts' Stories</strong></h2><p>Airbnb began investing heavily in professional photography and storytelling. They didn't just show rooms—they showed the people who lived there. They shared the hosts' passions, their neighborhoods, and what made their spaces unique.</p><p>Each listing became a story. A musician's apartment in Brooklyn wasn't just a place to sleep—it was an invitation to experience New York through a local artist's eyes. A family home in Kyoto wasn't just accommodation—it was a chance to live like a local in ancient Japan.</p><h3><strong>The Impact of Authentic Storytelling</strong></h3><p>The results were dramatic. Bookings increased, trust was established, and Airbnb began its journey from struggling startup to a company valued at over $100 billion. The key insight was that people weren't just buying accommodation—they were buying experiences and connections.</p><h2><strong>Key Lessons for Your Brand</strong></h2><p>Airbnb's success offers several important lessons for anyone building a brand:</p><ul class=\"list-disc pl-6 space-y-1\"><li><p><strong>Trust is built through stories, not features:</strong> Technical specifications and feature lists don't create emotional connections. Stories do.</p></li><li><p><strong>Show the human side:</strong> People connect with people, not faceless corporations. Put the humans behind your brand front and center.</p></li><li><p><strong>Invest in quality presentation:</strong> Professional photography and well-crafted narratives signal that you care about the experience you're offering.</p></li><li><p><strong>Focus on the experience, not just the product:</strong> What will people feel, learn, or discover when they engage with your brand? That's your real story.</p></li></ul><h2><strong>Conclusion</strong></h2><p>Airbnb didn't succeed because they had a better booking system or more features than competitors. They succeeded because they understood that in the sharing economy, trust is the currency—and storytelling is how you earn it.</p><p>Your brand, no matter what industry you're in, can apply these same principles. Find the human stories behind what you do. Tell them authentically. Build trust through genuine connection. That's how you turn strangers into loyal customers.</p>",
        author: "Harshit Dhodi",
        date: "2026-05-22",
        created_at: "2026-05-25T17:33:16.285Z",
        updated_at: "2026-05-27T15:25:37.686Z",
        slug: "airbnb-storytelling-trust",
        category: "6a0f345f18153bfec723c178",
        image: "/uploads/1779895533434-dqfmcrdaiwi.png",
        category_populated: null,
        category_label: null
      },
      {
        id: "6a1487dc681c890767fd3c5c",
        title: "The Hero's Journey in Modern Branding",
        tagline: "THE ANATOMY OF GREAT STORIES",
        description: "Understanding how ancient narrative structures apply to contemporary brand storytelling strategies.",
        long_description: "<p>The Hero's Journey is a narrative structure that has been used for thousands of years. From ancient myths to modern blockbusters, this structure resonates with audiences because it reflects our own struggles and triumphs.</p><h2><strong>The Call to Adventure</strong></h2><p>Every hero story begins with a call to adventure. For brands, this is the moment they realize they can do something more, be something more.</p><h2><strong>The Road of Trials</strong></h2><p>Every hero faces trials and tribulations. For brands, this is the hard work of building something meaningful in the face of doubt and uncertainty.</p><h2><strong>The Return</strong></h2><p>Every hero returns transformed. For brands, this is the moment they share their success and inspire others to follow in their footsteps.</p>",
        author: "Harshit Dhodi",
        date: "2026-05-21",
        created_at: "2026-05-25T17:33:16.285Z",
        updated_at: "2026-05-27T15:25:37.686Z",
        slug: "hero-journey-modern-branding",
        category: "6a0f345f18153bfec723c179",
        image: "/uploads/1779895533434-dqfmcrdaiwi.png",
        category_populated: null,
        category_label: null
      }
    ];

    // Filter by slug if provided
    const filteredArticles = slug 
      ? articlesData.filter(a => a.slug === slug)
      : articlesData;

    return NextResponse.json({
      success: true,
      data: filteredArticles
    });
  } catch (error) {
    console.error("Articles API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch articles data" },
      { status: 500 }
    );
  }
}
