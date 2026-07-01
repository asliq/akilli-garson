import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { serviceCallsApi } from '../api/services'
import toast from 'react-hot-toast'

export const serviceCallKeys = {
  all: ['serviceCalls'],
  pending: () => [...serviceCallKeys.all, 'pending'],
}

export function useServiceCalls(options = {}) {
  return useQuery({
    queryKey: serviceCallKeys.all,
    queryFn: serviceCallsApi.getAll,
    refetchInterval: 5000,
    staleTime: 2000,
    ...options,
  })
}

export function usePendingServiceCalls() {
  return useQuery({
    queryKey: serviceCallKeys.pending(),
    queryFn: serviceCallsApi.getPending,
    refetchInterval: 3000,
    staleTime: 1000,
  })
}

export function useCreateServiceCall() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: serviceCallsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: serviceCallKeys.all })
    },
    onError: () => toast.error('Talep gönderilemedi'),
  })
}

export function useHandleServiceCall() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: serviceCallsApi.markHandled,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: serviceCallKeys.all })
      toast.success('Talep yanıtlandı')
    },
  })
}
