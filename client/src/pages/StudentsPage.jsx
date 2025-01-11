import React, { useEffect, useState } from 'react';
import { useStudentsStore } from '../store/studentsStore';
import LoadingSpinner from '../components/animations/loader/LoadingSpinner';
import StudentForm from '../components/StudentForm'; // Import the student form component
import { Plus } from 'lucide-react';
import StudentList from '../components/StudentList';
import { toast } from 'react-hot-toast';

const StudentsPage = () => {
  const {
    students,
    isLoading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudentsStore();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleCreateStudent = (studentData) => {
    createStudent(studentData).then(() => {
      setShowCreateForm(false);
      fetchStudents();
    });
  };
  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setShowCreateForm(true);
  };

  const handleUpdateStudent = async (studentId, updates) => {
    try {
      await updateStudent(studentId, updates);
      setShowCreateForm(false);
      setStudentToEdit(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error(error || 'Error updating student');
    }
  };

  const handleFormClose = () => {
    setShowCreateForm(false);
    setStudentToEdit(null);
  };

  return (
    <div className='mt-5'>
      <div className='flex justify-end'>
        <button
          className='mb-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className='w-4 h-4 mr-2' />
          Add Student
        </button>
      </div>
      <StudentForm
        isOpen={showCreateForm}
        onClose={handleFormClose}
        onSubmit={handleCreateStudent}
        student={studentToEdit}
        onUpdate={handleUpdateStudent}
      />
      <StudentList
        students={students}
        onEdit={handleEditStudent}
        onDelete={deleteStudent}
      />
    </div>
  );
};

export default StudentsPage;