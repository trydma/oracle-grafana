import * as React from 'react';

import { FormEvent } from 'react';
import { Label, TextArea } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';

import { DataSource } from '../datasource';
import { interpolate } from '../interpolate';
import { MyDataSourceOptions, MyQuery } from '../types';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export function QueryEditor({ onChange, query }: Props) {
  const onSQLChange = (event: FormEvent<HTMLTextAreaElement>) => {
    onChange({
      ...query,
      o_sql: event.currentTarget.value,
      o_parsed: interpolate(event.currentTarget.value ?? '')
    });
  }

  return (
    <div style={{
      alignItems: 'stretch',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'stretch',
      minHeight: '320px'
    }}>
      <div style={{
        flexGrow: 1,
        minWidth: '480px',
        padding: '10px 5px'
      }}>
        <Label description='Query to make on an Oracle database'>
          Query
        </Label>
        <TextArea
          value={query.o_sql}
          onChange={onSQLChange}
          placeholder={`SELECT * \nFROM SYS.races \nWHERE data BETWEEN $__from AND $__to`}
          width='100%'
          rows={12}
          required
        />
      </div>
      <div style={{
        flexGrow: 1,
        minWidth: '480px',
        padding: '10px 5px'
      }}>
        <Label description='How the query will be executed on the database, using all the available variables'>
          Parsed Query
        </Label>
        <TextArea
          value={interpolate(query.o_sql ?? '')}
          rows={12}
          width='100%'
          readOnly
        />
      </div>
    </div>
  );
}
