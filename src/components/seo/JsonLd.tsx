import React from 'react'

type Props = {
  data: object | object[]
  id?: string
}

export const JsonLd: React.FC<Props> = ({ data, id }) => {
  const json = JSON.stringify(data, (_, v) => (v === undefined ? null : v))
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
