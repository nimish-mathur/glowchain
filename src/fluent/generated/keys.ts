import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '6d7ce944b110405c82b538f815a9212f'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '544c941b2d12459a99305f639cbcbef9'
                    }
                }
                composite: [
                    {
                        table: 'sn_glider_source_artifact'
                        id: '06b9fc2611174c82be545f5d1eff508c'
                        key: {
                            name: 'x_1814931_glow_incident_manager.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '1cad5e65de4445339b998e114073d803'
                        key: {
                            name: 'x_1814931_glow/main'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '4298531beb1241efbe1ba9a53eafea7f'
                        key: {
                            application_file: '1cad5e65de4445339b998e114073d803'
                            source_artifact: '06b9fc2611174c82be545f5d1eff508c'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '55c469e6942f4163bd41ecfc5cf8d354'
                        key: {
                            application_file: '81b61f9bd0b74bd897d59b864cea1ddf'
                            source_artifact: '06b9fc2611174c82be545f5d1eff508c'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '6ae66a52ce374a00b70f6a03cf6580b6'
                        key: {
                            application_file: 'af9057b143f3468ba605be0ae4b3eece'
                            source_artifact: '06b9fc2611174c82be545f5d1eff508c'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '81b61f9bd0b74bd897d59b864cea1ddf'
                        key: {
                            name: 'x_1814931_glow/main.js.map'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'af9057b143f3468ba605be0ae4b3eece'
                        key: {
                            endpoint: 'x_1814931_glow_incident_manager.do'
                        }
                    },
                ]
            }
        }
    }
}
