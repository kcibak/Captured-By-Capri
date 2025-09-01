import React, { useState } from 'react';
import styled from 'styled-components';

// Layout wrapper consistent with About page spacing
const PageWrap = styled.section`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 4rem auto;
  padding: clamp(1rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem) 3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  /* Override to use the serif (Belgiano) font across this page per request */
  font-family: ${p => p.theme.font.heading};
`;

const Heading = styled.h1`
  font-size: clamp(2.2rem, 1.4rem + 3vw, 3.4rem);
  background: linear-gradient(120deg, ${p => p.theme.colors.coral}, ${p => p.theme.colors.orange});
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: .5px;
  margin: 0 0 .5rem 0;
`;

const Intro = styled.p`
  margin: 0;
  max-width: 60ch;
  line-height: 1.55;
  font-size: clamp(.95rem, .85rem + .35vw, 1.05rem);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

const Label = styled.label`
  font-size: .85rem;
  font-weight: 600;
  letter-spacing: .5px;
  text-transform: uppercase;
  color: ${p => p.theme.colors.hunter};
  font-family: ${p => p.theme.font.heading};
  display: inline-flex;
  align-items: center;
  gap: .25rem;
  .req { color: ${p => p.theme.colors.coral}; font-size: 1.05em; line-height: 1; }
`;

// Using a function form so we can access theme inside the string safely
const sharedInput = (p: { theme: any }) => `
  width: 100%;
  font: inherit;
  font-family: ${p.theme.font.heading};
  font-size: .95rem;
  line-height: 1.4;
  padding: .8rem 1rem .75rem;
  border-radius: 14px;
  border: 1px solid ${p.theme.colors.hunter}40; /* hunter with alpha */
  background: #ffffffcc;
  backdrop-filter: blur(4px);
  color: ${p.theme.colors.forest};
  transition: border-color .25s, background .25s, box-shadow .25s;
  box-shadow: 0 4px 16px -6px rgba(20,37,30,0.18);
  &:focus { outline: none; border-color: ${p.theme.colors.coral}; box-shadow: 0 0 0 3px ${p.theme.colors.coral}33; background: #fff; }
  &::placeholder { color: ${p.theme.colors.hunter}99; font-family: ${p.theme.font.heading}; letter-spacing: .3px; }
`;

const Input = styled.input`${sharedInput}`;
const TextArea = styled.textarea`
  ${sharedInput};
  min-height: 180px;
  resize: vertical;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SubmitButton = styled.button`
  --btn-accent: ${p => p.theme.colors.coral};
  cursor: pointer;
  border: 1px solid ${p => p.theme.colors.hunter}40;
  background: #ffffffcc;
  backdrop-filter: blur(4px);
  color: ${p => p.theme.colors.forest};
  padding: 0.75rem 1.4rem;
  border-radius: 30px;
  font-size: .9rem;
  font-weight: 500;
  letter-spacing: .4px;
  font-family: ${p => p.theme.font.body};
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  transition: color .25s, border-color .25s, background .25s, transform .2s;
  &:hover { border-color: var(--btn-accent); color: var(--btn-accent); background: #fff; }
  &:active { transform: translateY(1px); }
  &:disabled { opacity: .5; cursor: not-allowed; transform: none; }
`;

const PlaceholderNote = styled.p`
  font-size: .75rem;
  margin: 0;
  color: ${p => p.theme.colors.hunter};
  letter-spacing: .3px;
`;

const Status = styled.div<{ $success?: boolean }>`
  font-size: .8rem;
  font-weight: 500;
  letter-spacing: .4px;
  color: ${p => (p.$success ? p.theme.colors.coral : p.theme.colors.hunter)};
`;

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      // Let browser show native validation messages
      return;
    }
    setSubmitted(true);
    // Placeholder: integrate mail service later.
  }

  return (
    <PageWrap>
      <header>
        <Heading>Get In Touch</Heading>
        <Intro>
          Have a project, event, or story you want captured? Fill out the form and I&apos;ll respond soon.
        </Intro>
      </header>
      <Form noValidate onSubmit={handleSubmit} aria-describedby="contact-placeholder">
        <FieldRow>
          <Label htmlFor="subject">Subject <span className="req" aria-hidden>*</span></Label>
          <Input id="subject" name="subject" required placeholder="Project inquiry, Wedding coverage, etc." />
        </FieldRow>
        <FieldRow>
          <Label htmlFor="name">Name <span className="req" aria-hidden>*</span></Label>
          <Input id="name" name="name" required placeholder="Your full name" />
        </FieldRow>
        <FieldRow>
          <Label htmlFor="email">Email <span className="req" aria-hidden>*</span></Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </FieldRow>
        <FieldRow>
          <Label htmlFor="message">Message <span className="req" aria-hidden>*</span></Label>
            <TextArea id="message" name="message" required placeholder="Share details: dates, location, style, goals..." />
        </FieldRow>
        <Actions>
          <SubmitButton type="submit">Send Message</SubmitButton>
          {submitted && <Status $success role="status">Placeholder submitted (email service coming soon)</Status>}
        </Actions>
        <PlaceholderNote id="contact-placeholder">Mail service not connected yet; this is a front‑end placeholder.</PlaceholderNote>
      </Form>
    </PageWrap>
  );
};

export default Contact;
