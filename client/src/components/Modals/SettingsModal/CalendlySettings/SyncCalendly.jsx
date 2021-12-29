import { string } from 'prop-types';
import React, { useState } from 'react';
import { Button, Form } from 'react-bulma-components';
import { syncCalendlyResource } from '../../../../utils/api';

export const SyncCalendlyDetails = ({ password }) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('sync');

  const syncWithCalendly = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await syncCalendlyResource({ password });
      console.log(data);
      setButtonText('success! page reloading');
      setLoading(false);
      // setTimeout(() => { window.location.reload(); }, 100);
    } catch (error) {
      console.error(error);
      setButtonText('must add a token first');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={syncWithCalendly}>
      <Form.Field>
        <Form.Control>
          <Button
            fullwidth
            color='primary'
            loading={loading}
            disabled={password?.length < 8}
          >
            {buttonText}
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
};
export default SyncCalendlyDetails;

SyncCalendlyDetails.propTypes = {
  password: string.isRequired,
};