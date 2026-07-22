import React, { useState, useEffect, useMemo } from 'react'
import { IncidentService } from './services/IncidentService'
import IncidentList from './components/IncidentList'
import IncidentForm from './components/IncidentForm'
import type { IncidentFormData, IncidentRecord } from './types'
import { rawValue } from './types'
import './app.css'

export default function App() {
    const [incidents, setIncidents] = useState<IncidentRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [selectedIncident, setSelectedIncident] = useState<IncidentRecord | null>(null)
    const [error, setError] = useState<string | null>(null)

    const incidentService = useMemo(() => new IncidentService(), [])

    const refreshIncidents = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await incidentService.list()
            setIncidents(data)
        } catch (err) {
            setError('Failed to load incidents: ' + (err instanceof Error ? err.message : 'Unknown error'))
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void refreshIncidents()
    }, [])

    const handleCreateClick = () => {
        setSelectedIncident(null)
        setShowForm(true)
    }

    const handleEditClick = (incident: IncidentRecord) => {
        setSelectedIncident(incident)
        setShowForm(true)
    }

    const handleFormClose = () => {
        setShowForm(false)
        setSelectedIncident(null)
    }

    const handleFormSubmit = async (formData: IncidentFormData) => {
        setLoading(true)
        try {
            if (selectedIncident) {
                await incidentService.update(rawValue(selectedIncident.sys_id), formData)
            } else {
                await incidentService.create(formData)
            }
            setShowForm(false)
            await refreshIncidents()
        } catch (err) {
            setError('Failed to save incident: ' + (err instanceof Error ? err.message : 'Unknown error'))
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="incident-app">
            <header className="app-header">
                <h1>Incident Response Manager</h1>
                <button className="create-button" onClick={handleCreateClick}>
                    Create New Incident
                </button>
            </header>

            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <IncidentList
                    incidents={incidents}
                    onEdit={handleEditClick}
                    onRefresh={refreshIncidents}
                    service={incidentService}
                />
            )}

            {showForm && (
                <IncidentForm incident={selectedIncident} onSubmit={handleFormSubmit} onCancel={handleFormClose} />
            )}
        </div>
    )
}
