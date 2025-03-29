import { IFormField } from '@/components/common/modal/create-update';
import { Dispatch, SetStateAction } from 'react';

export const clearForm = (setFields: Dispatch<SetStateAction<IFormField[]>>, closeModal = false, setIsModalOpen: Dispatch<SetStateAction<boolean>>, setIsEditable: Dispatch<SetStateAction<boolean>>, setUUID: Dispatch<SetStateAction<string | null>>) => {
    setFields([]);
    closeModal && setIsModalOpen(false);
    setIsEditable(false);
    setUUID(null);
  }