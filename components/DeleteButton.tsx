"use client"

import React from 'react'
import { Button } from './ui/button'
import { useDeleteForm } from '@/hooks/useDeleteForm';

const DeleteButton = () => {
   
  return (
    <Button variant={"destructive"}>Delete form</Button>
  )
}

export default DeleteButton