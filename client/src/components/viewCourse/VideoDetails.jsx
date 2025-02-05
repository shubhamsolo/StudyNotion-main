import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureComplete } from "../../services/operations/courseAPI";
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import { Player , BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';

function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetail = async () => {
      if (!courseSectionData.length) return;
      if (!courseId || !sectionId || !subSectionId) {
        navigate('/dashboard/enrolled-courses');
        return;
      }
      const filteredData = courseSectionData.filter(
        (section) => section._id === sectionId
      );
      const filteredVideoData = filteredData?.[0].subSection.filter(
        (subSection) => subSection._id === subSectionId
      );

      setVideoData(filteredVideoData[0]);
      setVideoEnded(false);
    }
    setVideoSpecificDetail();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    return currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1;
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
      return;
    }

    const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
    const firstSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
    navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`);
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
      return;
    }

    const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
    const noOfSubSections = courseSectionData[currentSectionIndex - 1].subSection.length;
    const firstSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[noOfSubSections - 1]._id;
    navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${firstSubSectionId}`);
  }

  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureComplete({ courseId, subSectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  }

  if (loading) {
    return (<div className="flex items-center justify-center h-full">Loading...</div>);
  }

  return (
    <div className="container mx-auto p-4">
      {!videoData ? (
        <div className="text-center">No Data Found</div>
      ) : (
        <div className="relative flex flex-col items-center">
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
            className="w-full max-w-4xl"
          >
            <BigPlayButton position="center" />
          </Player>
          {videoEnded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 space-y-4">
              {!completedLectures.includes(subSectionId) && (
                <button
                  disabled={loading}
                  onClick={handleLectureCompletion}
                    className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                >
                  {!loading ? "Mark As Completed" : "Loading..."}
                </button>
              )}

              <button
                disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef.current?.seek(0);
                    playerRef.current.play();
                    setVideoEnded(false);
                  }
                }}
                className="text-center text-[13px] px-6 py-3 rounded-md font-bold text-white bg-richblack-800 hover:scale-95 transition-all duration-200"
              >
                Rewatch
              </button>

              <div className="flex space-x-4">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                  >
                    Prev
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-8 ">
        <h1 className="text-2xl font-semibold text-richblack-25">{videoData?.title}</h1>
        <p className="mt-2 text-lg">{videoData?.description}</p>
      </div>
    </div>
  );
}

export default VideoDetails;
