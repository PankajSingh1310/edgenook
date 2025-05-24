import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    avatar: '',
    title: '',
    description: '',
    duration: '',
    studentsGetDescription: '',
    samples: [],
    modules: [],
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        console.log('Response:', res);
        if (res.status !== 200) {
            alert('Failed to fetch course data');
            return;
        }
        const data = res.data;
        if (!data.course) {
            alert('Course not found');
            return;
        }
        console.log('Fetched course data:', data.courses);
        setForm({
          avatar: data.course.avatar,
          title: data.course.title,
          description: data.course.description,
          duration: data.course.duration,
          studentsGetDescription: data.course.studentsGet?.description || '',
          samples: data.course.studentsGet?.samples || [''],
          modules: data.course.modules?.length ? data.course.modules : [{ title: '', content: '' }],
        });
      } catch (err) {
        console.error('Failed to fetch course', err);
        alert('Failed to load course');
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index, field, value) => {
    const updated = [...form.modules];
    updated[index][field] = value;
    setForm({ ...form, modules: updated });
  };

  const handleSampleChange = (index, value) => {
    const updated = [...form.samples];
    updated[index] = value;
    setForm({ ...form, samples: updated });
  };

  const addModule = () => {
    setForm({ ...form, modules: [...form.modules, { title: '', content: '' }] });
  };

  const addSample = () => {
    setForm({ ...form, samples: [...form.samples, ''] });
  };

  const handleImageUpload = async () => {
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append('file', avatarFile);
    formData.append('upload_preset', UPLOAD_PRESET);

    setUploading(true);
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
      return res.data.secure_url;
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.avatar;

    if (avatarFile) {
      const uploaded = await handleImageUpload();
      if (uploaded) imageUrl = uploaded;
    }

    try {
      await axios.put(`/api/admin/course/update/${id}`, {
        avatar: imageUrl,
        title: form.title,
        description: form.description,
        duration: form.duration,
        studentsGet: {
          description: form.studentsGetDescription,
          samples: form.samples,
        },
        modules: form.modules,
      });

      alert('Course updated successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error updating course:', err);
      alert('Failed to update course');
    }
  };

//   const handleUpdateCourse = async () => {
//     try {
//       const response = await axios.put(
//         `/api/admin/course/update/${id}`,
//         {
//           title,
//           description,
//           duration,
//           // add other fields like modules, avatar, studentsGet, etc.
//         }
//       );
//       console.log("Course updated successfully", response.data);
//       // optionally navigate or show a toast
//     } catch (error) {
//       console.error("Failed to update course", error);
//     }
//   };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Course</h1>
      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 shadow-lg p-6 rounded-xl">
        {/* Avatar Upload */}
        <div className="space-y-3">
          <label className="block font-semibold">Course Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="block w-full p-2 border rounded"
          />
          {form.avatar && (
            <img
              src={form.avatar}
              alt="Course avatar"
              className="w-40 h-40 object-cover mt-2 rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Title, Description, Duration */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
              placeholder="Course Title"
            />
          </div>

          <div>
            <label className="block font-semibold">Duration</label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              placeholder="e.g., 3 weeks"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded"
            placeholder="Course Description"
          />
        </div>

        {/* Modules Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Modules</h2>
          {form.modules.map((mod, idx) => (
            <div key={idx} className="space-y-2 mb-4">
              <input
                type="text"
                placeholder="Module Title"
                value={mod.title}
                onChange={(e) => handleModuleChange(idx, 'title', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Module Content"
                value={mod.content}
                onChange={(e) => handleModuleChange(idx, 'content', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addModule}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add Module
          </button>
        </div>

        {/* Students Get Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">What Students Will Get</h2>
          <textarea
            name="studentsGetDescription"
            value={form.studentsGetDescription}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Describe what students will get..."
          />
          {form.samples.map((sample, idx) => (
            <input
              key={idx}
              type="text"
              value={sample}
              onChange={(e) => handleSampleChange(idx, e.target.value)}
              placeholder="Sample resource URL"
              className="w-full p-2 border rounded mt-2"
            />
          ))}
          <button
            type="button"
            onClick={addSample}
            className="text-blue-600 hover:text-blue-800 font-medium mt-2 block"
          >
            + Add Sample
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            // onClick={handleUpdateCourse}
            disabled={uploading}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            {uploading ? 'Updating...' : 'Update Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
