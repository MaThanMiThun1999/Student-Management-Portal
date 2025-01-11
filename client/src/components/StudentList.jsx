import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { formatCustomDate } from '../utils/date';
import { useStudentsStore } from '../store/studentsStore';

const StudentList = ({ students, onEdit, onDelete }) => {
  const { fetchStudents } = useStudentsStore();

  const handleEdit = (student) => {
    fetchStudents();
    onEdit(student);
  };

  const handleDelete = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      fetchStudents();
      onDelete(studentId);
    }
  };

  return (
    <div className='overflow-x-auto'>
      <h2 className='text-4xl font-bold mb-4'>Students List</h2>
      <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
        <thead className='bg-gray-50 rounded-full'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Student ID
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Phone
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              DOB
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Grade
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Parent Name
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Parent Phone
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              Address
            </th>
            <th
              scope='col'
              colSpan={2}
              className='relative text-black px-6 py-3'
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {student.studentId}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div>
                      <div className='text-sm font-medium text-gray-900'>
                        {student.firstName} {student.lastName}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {student.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {student.phoneNumber}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {formatCustomDate(student.dateOfBirth, 'D-MMM-YYYY')}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {student.gradeLevel}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {student.parentName}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>
                    {student.parentPhoneNumber}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900'>{student.address}</div>
                </td>
                {/* Other table data */}
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <button
                    onClick={() => handleEdit(student)}
                    className='text-indigo-600 hover:text-indigo-900'
                  >
                    <Pencil className='h-5 w-5' />
                  </button>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <button
                    className='text-red-500 hover:text-red-800'
                    onClick={() => handleDelete(student._id)}
                  >
                    <Trash2 className='h-5 w-5' />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='12' className='text-center text-black py-4'>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
