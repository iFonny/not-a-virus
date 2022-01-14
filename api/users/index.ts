import api from 'src/utils/api';

// -------- Types

// -------- Methods

export const generageDefaultApiKey = async (userId: string): Promise<boolean> => {
  return await api.patch(`/users/${userId}/generate-default-api-key`).then((response) => response?.data?.success);
};
