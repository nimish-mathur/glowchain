import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import incidentPage from '../../client/index.html'

UiPage({
    $id: Now.ID['incident-manager-page'],
    endpoint: 'x_1814931_glow_incident_manager.do',
    description: 'Incident Response Manager UI Page',
    category: 'general',
    html: incidentPage,
    direct: true,
})
