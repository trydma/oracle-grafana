import * as React from 'react';

import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { InlineField, Input, SecretInput, Stack, FieldSet } from '@grafana/ui';
import { MyDataSourceOptions, MySecureJsonData } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> { }

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;

  const onConnStrChange = (event: any) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        o_connStr: event.target.value,
      }
    });
  };

  const onHostnameChange = (event: any) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        o_hostname: event.target.value,
      }
    });
  };

  const onPortChange = (event: any) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        o_port: Number(event.target.value),
      }
    });
  };

  const onServiceChange = (event: any) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        o_service: event.target.value,
        o_sid: ''
      }
    });
  };

  const onSIDChange = (event: any) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        o_service: '',
        o_sid: event.target.value,
      }
    });
  };

  const onUserChange = (event: any) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        o_user: event.target.value,
      }
    });
  };

  // Secure field (only sent to the backend)
  const onPasswordChange = (event: any) => {
    onOptionsChange({
      ...options,
      secureJsonData: {
        o_password: event.target.value,
      },
    });
  };

  const onPasswordReset = () => {
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        o_password: false
      },
      secureJsonData: {
        ...options.secureJsonData,
        o_password: ''
      },
    });
  };

  const { jsonData, secureJsonFields } = options;
  const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData;

  return (
    <Stack direction="column" gap={2}>
      <FieldSet label="Authentication">
        <Stack direction="row" gap={2}>
        <InlineField grow label="User" labelWidth={12}>
          <Input
            placeholder="oracle_user"
            required
            value={jsonData.o_user}
            width={40}
            onChange={onUserChange}
          />
        </InlineField>
        <InlineField grow label="Password" labelWidth={12}>
          <SecretInput
            isConfigured={(secureJsonFields && secureJsonFields.o_password) as boolean}
            placeholder="oracle_password"
            required
            value={secureJsonData.o_password}
            width={40}
            onChange={onPasswordChange}
            onReset={onPasswordReset}
          />
        </InlineField>
      </Stack>
      </FieldSet>
      <FieldSet label="Connection">
      <InlineField grow label="ConnString" labelWidth={12}>
        <Input
          placeholder="(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SID=XE)))"
          value={jsonData.o_connStr}
          width={94}
          onChange={onConnStrChange}
        />
      </InlineField>
      <Stack direction="row" gap={2}>
        <InlineField grow label="Hostname" labelWidth={12}>
          <Input
            placeholder="localhost"
            value={jsonData.o_hostname}
            width={40}
            onChange={onHostnameChange}
          />
        </InlineField>
        <InlineField grow label="Port" labelWidth={12}>
          <Input
            placeholder="1521"
            type="number"
            value={jsonData.o_port}
            width={40}
            onChange={onPortChange}
          />
        </InlineField>
      </Stack>
      <Stack direction="row" gap={2}>
        <InlineField grow label="Service" labelWidth={12}>
          <Input
            placeholder=""
            value={jsonData.o_service}
            width={40}
            onChange={onServiceChange}
          />
        </InlineField>
        <InlineField grow label="or SID" labelWidth={12}>
          <Input
            placeholder="XE"
            value={jsonData.o_sid}
            width={40}
            onChange={onSIDChange}
          />
        </InlineField>
      </Stack>
      </FieldSet>
    </Stack>
  );
}
