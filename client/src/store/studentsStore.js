import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';

export const useStudentsStore = create((set) => ({
  students: [],
  isLoading: false,
  error: null,

  fetchStudents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/student/all');
      set({ students: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching students',
        isLoading: false,
      });
    }
  },

  createStudent: async (studentData) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post('/student/create', studentData);
      set({ isLoading: false });
      set((state) => ({
        students: [...state.students, studentData], // Add newly created student to the list
      }));

    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Error creating student',
      });
    }
  },

  updateStudent: async (studentId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.put(`/student/${studentId}`, updatedData);

      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Error updating student',
      });
    }
  },

  deleteStudent: async (studentId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/student/${studentId}`);
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Error deleting student',
      });
    }
  },
}));