const PrivacyTerms = () => {
  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 className="text-4xl font-display font-semibold text-slate-800 mb-8">Privacy &amp; Terms</h1>

      <section className="mb-8">
        <h2 className="text-lg font-display font-semibold text-slate-800 mb-2">Privacy Policy</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          StudyNest collects only the information needed to run the platform: your name, email,
          university, and any resources or bookings you create. Your email address is never shown
          publicly — other students only see your name, university, and avatar. We don't sell your
          data to third parties. Passwords are stored using industry-standard hashing and are never
          visible to anyone, including our own team.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-display font-semibold text-slate-800 mb-2">Content Ownership</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Resources you upload remain your intellectual property. By uploading, you grant other
          StudyNest users a license to view and use the resource for personal study purposes. You
          can delete your resources at any time from the Manage Resources page, which removes them
          from the platform immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-display font-semibold text-slate-800 mb-2">Acceptable Use</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Don't upload copyrighted material you don't have rights to share, don't post misleading
          or plagiarized content, and treat tutors and fellow students with respect. Accounts that
          violate these terms may be suspended.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-display font-semibold text-slate-800 mb-2">Tutor Bookings</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Tutor sessions booked through StudyNest are agreements between the student and tutor
          directly. StudyNest facilitates the connection and scheduling but is not a party to
          payment arrangements made outside the platform.
        </p>
      </section>
    </div>
  );
};

export default PrivacyTerms;
