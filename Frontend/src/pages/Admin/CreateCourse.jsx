import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CLOUD_NAME =import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ;

const CreateCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    avatar: '',
    title: '',
    description: '',
    duration: '',
    studentsGetDescription: '',
    samples: [''],
    modules: [{ title: '', content: '' }],
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...form.modules];
    updatedModules[index][field] = value;
    setForm({ ...form, modules: updatedModules });
  };

  const handleSampleChange = (index, value) => {
    const updatedSamples = [...form.samples];
    updatedSamples[index] = value;
    setForm({ ...form, samples: updatedSamples });
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
    formData.append('cloud_name', CLOUD_NAME);

    // console.log('Uploading image to Cloudinary:', avatarFile);
    setUploading(true);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      console.log('Cloudinary upload response:', res);
      return res.data.secure_url;
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.avatar;

    // Upload image if selected
    if (avatarFile) {
      const uploadedUrl = await handleImageUpload();
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    try {
      await axios.post('/api/admin/course', {
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
      alert('Course created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Course Image (Avatar)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="w-full p-2 rounded border"
          />
          {avatarFile && <p className="text-sm mt-1">{avatarFile.name}</p>}
        </div>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Course title"
          required
          className="w-full p-2 rounded border"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Course description"
          required
          className="w-full p-2 rounded border"
        />
        <input
          type="text"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Course duration (e.g., 1 month)"
          className="w-full p-2 rounded border"
        />

        {/* Modules */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Modules</h2>
          {form.modules.map((mod, idx) => (
            <div key={idx} className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Module title"
                value={mod.title}
                onChange={(e) => handleModuleChange(idx, 'title', e.target.value)}
                className="w-full p-2 rounded border"
              />
              <textarea
                placeholder="Module content"
                value={mod.content}
                onChange={(e) => handleModuleChange(idx, 'content', e.target.value)}
                className="w-full p-2 rounded border"
              />
            </div>
          ))}
          <button type="button" onClick={addModule} className="text-blue-600 underline">
            + Add Module
          </button>
        </div>

        {/* What Students Get */}
        <div>
          <h2 className="text-lg font-semibold mb-2">What Students Get</h2>
          <textarea
            name="studentsGetDescription"
            value={form.studentsGetDescription}
            onChange={handleChange}
            placeholder="Description of what students get"
            className="w-full p-2 rounded border"
          />
          {form.samples.map((sample, idx) => (
            <input
              key={idx}
              type="text"
              value={sample}
              onChange={(e) => handleSampleChange(idx, e.target.value)}
              placeholder="Sample file URL"
              className="w-full p-2 mt-2 rounded border"
            />
          ))}
          <button type="button" onClick={addSample} className="text-blue-600 underline mt-2">
            + Add Sample
          </button>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {uploading ? 'Uploading...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
