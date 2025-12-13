import AllVideosSection from '../../components/AllVideosSection';

export const metadata = {
  title: 'All Videos - Tamil Gaming',
  description: 'Complete collection of all videos from the Tamil Gaming YouTube channel. Browse, search, and discover gaming content in Tamil.',
  keywords: 'Tamil Gaming, YouTube videos, gaming content, Tamil, video library, gaming videos',
};

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AllVideosSection />
    </main>
  );
}