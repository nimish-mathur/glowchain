import React from 'react'
import './IncidentList.css'
import type { FieldValue, IncidentRecord } from '../types'
import { rawValue, displayValue } from '../types'
import type { IncidentService } from '../services/IncidentService'

interface IncidentListProps {
    incidents: IncidentRecord[]
    onEdit: (incident: IncidentRecord) => void
    onRefresh: () => void
    service: IncidentService
}

export default function IncidentList({ incidents, onEdit, onRefresh, service }: IncidentListProps) {
    const handleDelete = async (incident: IncidentRecord) => {
        if (!confirm(`Are you sure you want to delete ${displayValue(incident.number)}?`)) {
            return
        }

        try {
            await service.delete(rawValue(incident.sys_id))
            onRefresh()
        } catch (error) {
            console.error('Failed to delete incident:', error)
            alert('Failed to delete incident: ' + (error instanceof Error ? error.message : 'Unknown error'))
        }
    }

    const getStateClass = (state: FieldValue) => {
        const stateValue = displayValue(state)

        switch (stateValue) {
            case 'New':
                return 'state-new'
            case 'In Progress':
                return 'state-in-progress'
            case 'On Hold':
                return 'state-on-hold'
            case 'Resolved':
                return 'state-resolved'
            case 'Closed':
                return 'state-closed'
            default:
                return ''
        }
    }

    const getImpactClass = (impact: FieldValue) => {
        const impactValue = rawValue(impact)

        switch (impactValue) {
            case '1':
                return 'impact-high'
            case '2':
                return 'impact-medium'
            case '3':
                return 'impact-low'
            default:
                return ''
        }
    }

    return (
        <div className="incident-list">
            {incidents.length === 0 ? (
                <div className="no-incidents">No incidents found</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Description</th>
                            <th>State</th>
                            <th>Impact</th>
                            <th>Opened</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.map((incident) => {
                            // Extract primitive values from potential objects
                            const number = displayValue(incident.number)
                            const shortDesc = displayValue(incident.short_description)
                            const state = displayValue(incident.state)
                            const impact = displayValue(incident.impact)
                            const openedAt = displayValue(incident.opened_at)

                            return (
                                <tr key={rawValue(incident.sys_id)}>
                                    <td>{number}</td>
                                    <td>{shortDesc}</td>
                                    <td>
                                        <span className={`state-badge ${getStateClass(incident.state)}`}>{state}</span>
                                    </td>
                                    <td>
                                        <span className={`impact-badge ${getImpactClass(incident.impact)}`}>
                                            {impact}
                                        </span>
                                    </td>
                                    <td>{openedAt}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-button"
                                                onClick={() => onEdit(incident)}
                                                aria-label={`Edit incident ${number}`}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(incident)}
                                                aria-label={`Delete incident ${number}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
