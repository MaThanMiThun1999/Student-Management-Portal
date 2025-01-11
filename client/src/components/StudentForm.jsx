import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X } from 'lucide-react';

const StudentForm = ({ isOpen, onClose, onSubmit, student, onUpdate }) => {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (student) {
      setStudentId(student.studentId);
      setFirstName(student.firstName);
      setLastName(student.lastName);
      setEmail(student.email);
      setPhoneNumber(student.phoneNumber || '');
      setDateOfBirth(student.dateOfBirth ? student.dateOfBirth.slice(0, 10) : '');
      setGradeLevel(student.gradeLevel);
      setParentName(student.parentName || '');
      setParentPhoneNumber(student.parentPhoneNumber || '');
      setAddress(student.address || '');
    } else {
      setStudentId('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setDateOfBirth('');
      setGradeLevel('');
      setParentName('');
      setParentPhoneNumber('');
      setAddress('');
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = {
      studentId,
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      gradeLevel,
      parentName,
      parentPhoneNumber,
      address,
    };

    if (student) {
      onUpdate(student._id, studentData);
    } else {
      onSubmit(studentData);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                >
                  {student ? 'Edit Student' : 'Add New Student'}
<button onClick={onClose}><X className='w-6 h-6' /></button>
                </Dialog.Title>
                <form className="mt-5" onSubmit={handleSubmit}>
<div className='grid md:grid-cols-2 gap-3'>
                  <input
                    type="text"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'
                    required
                  />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'

                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'

                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'

                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'

                  />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'

                    required
                  />
                  <input
                    type="text"
                    placeholder="Grade Level"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'

                    required
                  />

                  <input
                    type="text"
                    placeholder="Parent Name"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'

                  />

                <input
                  type="text"
                  placeholder="Parent Contact"
                  value={parentPhoneNumber}
                  onChange={(e) => setParentPhoneNumber(e.target.value)}
                  className='border border-gray-400 px-2 py-1 rounded focus:outline-none focus:border-blue-500'

                />
                </div>
<textarea className='w-full border p-2 mt-4' value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      {student ? 'Update' : 'Save'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};


export default StudentForm;