import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            setLoading(true)
            const response = await fetch('http://localhost:8080/' + url, {
                method,
                body,
                headers,
            })

            if (response.status > 399) {
                throw new Error('Что-то пошло не так')
            }

            const data = await response.json()

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
        }
    }, [])
    return { loading, error, request }
}
