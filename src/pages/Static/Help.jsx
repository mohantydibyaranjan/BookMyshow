import React from 'react';
import { Formik, Form } from 'formik';
import {
  Container, Paper, Typography, Box, Grid,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { helpFormSchema } from '../../utils/validators';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';

// Mock FAQ data
const faqs = [
  {
    question: 'How do I book a ticket?',
    answer: 'To book a ticket, simply browse to your desired movie or event, click "Book Tickets", select a date and theatre, choose your seats on the interactive map, and proceed to checkout to complete your payment.'
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes, you can cancel your booking up to 2 hours before the showtime. Go to "My Bookings", find the relevant booking, and click the cancel icon. Please note that a small cancellation fee may apply.'
  },
  {
    question: 'How do I get my ticket after booking?',
    answer: 'Upon successful payment, you will receive a confirmation page with a QR code. This QR code is your ticket. You will also receive an email with the same confirmation details.'
  },
  {
    question: 'Do you support international payments?',
    answer: 'Yes, LuxeBook accepts payments from all major international credit and debit cards, as well as various other regional payment methods through our secure payment gateway.'
  },
];

const Help = () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log('Submitting help request:', values);
    // Mock API call
    setTimeout(() => {
      setSubmitting(false);
      setStatus({ success: 'Your message has been sent! We will get back to you shortly.' });
      resetForm();
    }, 1000);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} sx={{ p: 4, mt: 4, borderRadius: '16px' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          Help & Support
        </Typography>

        <Grid container spacing={5}>
          {/* FAQ Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 1, boxShadow: 'none', border: '1px solid #eee', borderRadius: '8px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 'medium' }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>

          {/* Contact Form Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Send us a Message
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={helpFormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, status }) => (
                <Form>
                  {status?.success ? (
                    <Typography color="success.main">{status.success}</Typography>
                  ) : (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormInput name="name" label="Your Name" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormInput name="email" label="Email Address" type="email" />
                      </Grid>
                      <Grid item xs={12}>
                        <FormInput name="subject" label="Subject" />
                      </Grid>
                      <Grid item xs={12}>
                        <FormInput name="message" label="Your Message" multiline rows={5} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" disabled={isSubmitting} fullWidth>
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Help;