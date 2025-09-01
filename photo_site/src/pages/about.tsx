import React from 'react';
import styled from 'styled-components';

const PageWrap = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem auto;
  padding: clamp(1rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem) 3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const HeroRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: start;
`;

const PortraitFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: 0 8px 30px -8px rgba(20,37,30,0.25);
  background: linear-gradient(135deg, ${p => p.theme.colors.peach} 0%, ${p => p.theme.colors.blush} 100%);
  & img { 
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(1.05) contrast(1.02);
  }
`;

const BioBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  line-height: 1.55;
  font-size: clamp(0.95rem, 0.85rem + 0.4vw, 1.1rem);
  font-weight: 400;
  p { margin: 0; }
`;

const Heading = styled.h1`
  font-size: clamp(2.2rem, 1.4rem + 3vw, 3.8rem);
  letter-spacing: .5px;
  background: linear-gradient(120deg, ${p => p.theme.colors.coral}, ${p => p.theme.colors.orange});
  -webkit-background-clip: text;
  color: transparent;
  margin: 0 0 0.5rem 0;
`;

const ResumeSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ResumeActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const ButtonLink = styled.a`
  --btn-accent: ${p => p.theme.colors.coral};
  text-decoration: none;
  background: #ffffffcc;
  backdrop-filter: blur(4px);
  color: ${p => p.theme.colors.forest};
  padding: 0.65rem 1.15rem;
  border-radius: 30px;
  font-family: ${p => p.theme.font.body};
  font-size: 0.9rem;
  letter-spacing: .4px;
  font-weight: 500;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  border: 1px solid ${p => p.theme.colors.hunter}40;
  transition: color .25s, border-color .25s, background .25s;
  &:hover { border-color: var(--btn-accent); color: var(--btn-accent); background: #fff; }
  &:active { transform: translateY(1px); }
`;

const ViewerFrame = styled.div<{ $tall?: boolean }>`
  width: 100%;
  /* Use viewport height but allow it to grow a bit on taller screens */
  height: ${p => (p.$tall ? 'calc(100vh - 160px)' : 'clamp(700px, 82vh, 1300px)')};
  border: 1px solid ${p => p.theme.colors.hunter}33;
  border-radius: 12px; /* Softer so native PDF controls aren't clipped */
  background: #ffffff;
  box-shadow: 0 10px 30px -10px rgba(20,37,30,0.18);
  position: relative;
  overflow: visible; /* Let built‑in PDF UI render fully */
  & > embed, & > object, & > iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    margin: 0;
    display: block;
  }
`;

// NOTE: Resume file lives in /public. Consider renaming to a simpler path like /resume.pdf later.
const RAW_RESUME_PATH = '/CapriProcopio.pdf';
const RESUME_PATH = encodeURI(RAW_RESUME_PATH) + '#view=FitH';

const About: React.FC = () => {
  return (
    <PageWrap>
      <HeroRow>
        <PortraitFrame>
          <img src="/portrait.jpg" alt="Capri Procopio portrait" loading="lazy" />
        </PortraitFrame>
        <BioBlock>
          <div>
            <Heading>About Capri</Heading>
          </div>
          <p>
            Placeholder bio: A short paragraph about Capri&apos;s passion for capturing authentic moments, her journey into photography, stylistic inspirations, and the stories she loves to tell through film and digital mediums. (Replace this with the real bio.)
          </p>
        </BioBlock>
      </HeroRow>

      <ResumeSection aria-labelledby="resume-heading">
        <h2 id="resume-heading" style={{ fontSize: 'clamp(1.6rem,1.2rem + 1vw,2.4rem)', margin: 0 }}>Resume</h2>
        <ResumeActions>
          <ButtonLink href={RESUME_PATH} download>Download Resume</ButtonLink>
          <ButtonLink href={RESUME_PATH} target="_blank" rel="noopener noreferrer">Open in New Tab</ButtonLink>
        </ResumeActions>
        <ViewerFrame>
          <embed src={RESUME_PATH} type="application/pdf" />
        </ViewerFrame>
      </ResumeSection>
    </PageWrap>
  );
};

export default About;
