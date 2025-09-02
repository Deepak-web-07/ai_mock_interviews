// import React from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";

// import InterviewCard from "@/components/InterviewCard";
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";

// async function Home() {
//   const user = await getCurrentUser();

//   const [ userInterviews, allInterview ] = await Promise.all([
//     await getInterviewsByUserId(user?.id!),
//     await getLatestInterviews({ userId: user?.id! }),
//   ]);

//   const hasPastInterviews = userInterviews?.length > 0;
//   const hasUpcomingInterviews = allInterview?.length > 0;

//   return (
//     <>
//       <section className="card-cta">
//         <div className="flex flex-col gap-6 max-w-lg">
//           <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
//           <p className="text-lg">
//             Practice on real interview questions & get instant feedback
//           </p>
//           <button className="btn-primary max-sm:w-full">
//             <Link href="/interview">Start an Interview</Link>
//           </button>
//         </div>

//         <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />

//       </section>

//       <section className="flex flex-col gap-6 mt-8">
//         <h2>Your Interviews</h2>

//         <div className="interviews-section">
//           {hasPastInterviews ? (
//               userInterviews?.map((interview) => (
//                 <InterviewCard 
//                 key={interview.id}
//                 userId={user?.id}
//                 // interviewId={interview.id}
//                 id={interview.id}
//                 role={interview.role}
//                 type={interview.type}
//                 techstack={interview.techstack}
//                 createdAt={interview.createdAt}
//                  />
//               ))) : (
//                   <p>You haven&apos;t taken any interviews yet</p>
//           )}
              

//         </div>
//       </section>

//       <section className="flex flex-col gap-6 mt-8">
//         <h2>Take an Interview</h2>

//         <div className="interviews-section">
//           {hasUpcomingInterviews ? (
//               allInterview?.map((interview) => (
//                 <InterviewCard 
//                 key={interview.id}
//                 userId={user?.id}
//                 // interviewId={interview.id}
//                 id={interview.id}
//                 role={interview.role}
//                 type={interview.type}
//                 techstack={interview.techstack}
//                 createdAt={interview.createdAt}
//                  />
//               ))) : (
//                   <p>There are no new interviews available</p>
//           )}

//         </div>
//       </section>
//     </>
//   )
// }

// export default Home;



import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";

async function Home() {
  try {
    const user = await getCurrentUser();

    // Check if user exists and has an id
    if (!user?.id) {
      return (
        <div className="text-center mt-8">
          <p>Please log in to see your interviews.</p>
          <Link href="/login" className="btn-primary inline-block mt-4">
            Log In
          </Link>
        </div>
      );
    }

    // Fetch interviews concurrently - remove redundant await
    const [userInterviews, allInterview] = await Promise.all([
      getInterviewsByUserId(user.id), // Removed redundant await and !
      getLatestInterviews({ userId: user.id }), // Removed redundant await and !
    ]);

    const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
    const hasUpcomingInterviews = (allInterview?.length ?? 0) > 0;

    return (
      <>
        <section className="card-cta">
          <div className="flex flex-col gap-6 max-w-lg">
            <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
            <p className="text-lg">
              Practice on real interview questions & get instant feedback
            </p>
            {/* Fixed: Use Link with button styling instead of wrapping button around Link */}
            <Link 
              href="/interview" 
              className="btn-primary max-sm:w-full inline-block text-center"
            >
              Start an Interview
            </Link>
          </div>

          <Image 
            src="/robot.png" 
            alt="robo-dude" 
            width={400} 
            height={400} 
            className="max-sm:hidden" 
          />
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2>Your Interviews</h2>

          <div className="interviews-section">
            {hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard 
                  key={interview.id}
                  userId={user.id}
                  id={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <p>You haven&apos;t taken any interviews yet</p>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2>Take an Interview</h2>

          <div className="interviews-section">
            {hasUpcomingInterviews ? (
              allInterview?.map((interview) => (
                <InterviewCard 
                  key={interview.id}
                  userId={user.id}
                  id={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <p>There are no new interviews available</p>
            )}
          </div>
        </section>
      </>
    );
  } catch (error) {
    // Handle errors gracefully
    console.error('Error loading home page:', error);
    return (
      <div className="text-center mt-8">
        <h2>Something went wrong</h2>
        <p>Unable to load your interviews. Please try again later.</p>
        <Link href="/interview" className="btn-primary inline-block mt-4">
          Start New Interview
        </Link>
      </div>
    );
  }
}

export default Home;