import React from 'react'
import { Helmet } from 'react-helmet-async'

type PageHeaderProps ={
    title:string,
    canonical?:string,
    description?:string
}

export const PageHeader = ({title, canonical, description}:PageHeaderProps) => {
  return (
    <>
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <link type='canonical' href={canonical} />
        </Helmet>
    </>
  )
}
