"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit2, Plus, X, ChevronDown, ChevronUp } from "lucide-react";

interface Card {
  title: string;
  description: string;
  image: string;
  altName: string;
  imgTitle: string;
}

interface Section {
  _id: string;
  heading: string;
  subHeading: string;
  section_name: string;
  cards: Card[];
  createdAt: string;
}

const emptyCard = (): Card => ({
  title: "",
  description: "",
  image: "",
  altName: "",
  imgTitle: "",
});

const emptyForm = () => ({
  heading: "",
  subHeading: "",
  section_name: "",
  cards: [emptyCard()],
});

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm());

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch("/api/admin/sections");
      const data = await res.json();
      if (data.success) {
        setSections(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch sections:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingId("new");
    setFormData(emptyForm());
  };

  const handleEdit = (section: Section) => {
    setEditingId(section._id);
    setFormData({
      heading: section.heading,
      subHeading: section.subHeading,
      section_name: section.section_name,
      cards: section.cards.length > 0 ? section.cards : [emptyCard()],
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(emptyForm());
  };

  // Top-level field changes
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Card field changes
  const handleCardChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const cards = [...prev.cards];
      cards[index] = { ...cards[index], [name]: value };
      return { ...prev, cards };
    });
  };

  const addCard = () => {
    setFormData((prev) => ({ ...prev, cards: [...prev.cards, emptyCard()] }));
  };

  const removeCard = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId === "new" ? "POST" : "PUT";
      const url =
        editingId === "new"
          ? "/api/admin/sections"
          : `/api/admin/sections/${editingId}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        setFormData(emptyForm());
        fetchSections();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error saving section:", error);
      alert("Failed to save section");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
      const res = await fetch(`/api/admin/sections/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSections(sections.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete section:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Sections</h1>
          <p className="text-slate-400 mt-1">Manage page sections with cards</p>
        </div>
        {editingId === null && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:brightness-95 transition"
          >
            <Plus size={20} />
            New Section
          </button>
        )}
      </div>

      {/* Form */}
      {editingId && (
        <form
          onSubmit={handleSave}
          className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6"
        >
          <h3 className="text-lg font-semibold text-white">
            {editingId === "new" ? "Create Section" : "Edit Section"}
          </h3>

          {/* Section fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Heading <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleFieldChange}
                placeholder="Section heading"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Section Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="section_name"
                value={formData.section_name}
                onChange={handleFieldChange}
                placeholder="e.g. hero, features, testimonials"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Sub Heading</label>
            <textarea
              name="subHeading"
              value={formData.subHeading}
              onChange={handleFieldChange}
              placeholder="Optional sub heading text"
              rows={2}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition"
            />
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-white">
                Cards ({formData.cards.length})
              </h4>
              <button
                type="button"
                onClick={addCard}
                className="flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition"
              >
                <Plus size={16} />
                Add Card
              </button>
            </div>

            {formData.cards.map((card, index) => (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-300">
                    Card {index + 1}
                  </span>
                  {formData.cards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCard(index)}
                      className="p-1 text-red-400 hover:bg-red-900/20 rounded transition"
                      title="Remove card"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={card.title}
                      onChange={(e) => handleCardChange(index, e)}
                      placeholder="Card title"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={card.image}
                      onChange={(e) => handleCardChange(index, e)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Alt Name</label>
                    <input
                      type="text"
                      name="altName"
                      value={card.altName}
                      onChange={(e) => handleCardChange(index, e)}
                      placeholder="Image alt text"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Image Title</label>
                    <input
                      type="text"
                      name="imgTitle"
                      value={card.imgTitle}
                      onChange={(e) => handleCardChange(index, e)}
                      placeholder="Image title attribute"
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={card.description}
                    onChange={(e) => handleCardChange(index, e)}
                    placeholder="Card description"
                    rows={2}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-gold focus:outline-none transition text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="submit"
              className="bg-gold text-black px-6 py-2 rounded-lg font-semibold hover:brightness-95 transition"
            >
              {editingId === "new" ? "Create Section" : "Update Section"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-400">Loading sections...</p>
        </div>
      ) : sections.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-lg">
          <p className="text-slate-400 mb-4">No sections yet</p>
          <button
            onClick={handleAddNew}
            className="inline-block bg-gold text-black px-4 py-2 rounded-lg font-semibold hover:brightness-95 transition"
          >
            Create your first section
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">
                  Heading
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">
                  Section Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">
                  Cards
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sections.map((section) => (
                <>
                  <tr
                    key={section._id}
                    className="hover:bg-slate-800/50 transition"
                  >
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{section.heading}</p>
                      {section.subHeading && (
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {section.subHeading}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded font-mono">
                        {section.section_name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          setExpandedSection(
                            expandedSection === section._id ? null : section._id
                          )
                        }
                        className="flex items-center gap-1 text-sm text-slate-300 hover:text-white transition"
                      >
                        {section.cards.length} card{section.cards.length !== 1 ? "s" : ""}
                        {expandedSection === section._id ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(section.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(section)}
                          className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(section._id)}
                          className="p-2 text-red-400 hover:bg-red-900/20 rounded transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded cards row */}
                  {expandedSection === section._id && section.cards.length > 0 && (
                    <tr key={`${section._id}-cards`} className="bg-slate-800/30">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {section.cards.map((card, i) => (
                            <div
                              key={i}
                              className="bg-slate-800 border border-slate-700 rounded-lg p-3 space-y-1"
                            >
                              {card.image && (
                                <img
                                  src={card.image}
                                  alt={card.altName || card.title}
                                  title={card.imgTitle}
                                  className="w-full h-24 object-cover rounded mb-2"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                  }}
                                />
                              )}
                              <p className="text-sm font-semibold text-white">{card.title}</p>
                              {card.description && (
                                <p className="text-xs text-slate-400 line-clamp-2">
                                  {card.description}
                                </p>
                              )}
                              {(card.altName || card.imgTitle) && (
                                <p className="text-xs text-slate-500">
                                  {card.altName && <span>alt: {card.altName}</span>}
                                  {card.altName && card.imgTitle && " · "}
                                  {card.imgTitle && <span>title: {card.imgTitle}</span>}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
