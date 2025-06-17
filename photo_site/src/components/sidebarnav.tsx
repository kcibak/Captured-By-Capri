import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED = 64;

const Sidebar = styled.nav<{ $expanded: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ $expanded }) => ($expanded ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED)}px;
  background: ${({ theme }) => theme.colors.peach};
  color: ${({ theme }) => theme.colors.forest};
  transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
  z-index: 1000;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.button<{ $expanded: boolean }>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.forest};
  font-size: 2rem;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? 'flex-end' : 'center')};
  padding: 0 1rem;
  cursor: pointer;
  outline: none;
  transition: background 0.2s;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.blush};
  }
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)<{ $active?: boolean; $expanded: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: ${({ theme, $active }) => $active ? theme.colors.coral : theme.colors.forest};
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.heading};
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  background: none;
  border: none;
  outline: none;
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  cursor: pointer;
  white-space: nowrap;
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  pointer-events: ${({ $expanded }) => ($expanded ? 'auto' : 'none')};
  visibility: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};
  height: 2.4rem;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.blush};
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const SubNavList = styled.ul<{ $show: boolean; $expanded: boolean }>`
  list-style: none;
  margin: 0 0 0 1.5rem;
  padding: 0;
  display: ${({ $show, $expanded }) => ($show && $expanded ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.25rem;
  background: ${({ theme }) => theme.colors.peach};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.04);
  position: static;
  min-width: 140px;
`;

const SubNavLink = styled.a`
  color: ${({ theme }) => theme.colors.hunter};
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.heading};
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  display: block;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.blush};
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const workSections = [
  { id: 'film', label: '35mm Film' },
  { id: 'beach', label: 'Beach' },
  { id: 'graduation', label: 'Graduation' },
  { id: 'sports', label: 'Sports' },
  { id: 'studio', label: 'Studio' },
  { id: 'wedding', label: 'Wedding' },
];

export const SidebarNav = () => {
  const location = useLocation();
  const isWorkPage = location.pathname === '/work';
  // Initially collapsed
  const [manualCollapsed, setManualCollapsed] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);
  const expanded = hovered || !manualCollapsed;
  const [workOpen, setWorkOpen] = React.useState(false);

  return (
    <Sidebar
      $expanded={expanded}
      aria-label="Main navigation"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <ToggleButton
        $expanded={expanded}
        aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        onClick={() => setManualCollapsed(c => !c)}
      >
        {expanded ? '‹' : '›'}
      </ToggleButton>
      <NavList>
        <NavItem>
          <NavLink to="/" $active={location.pathname === '/'} $expanded={expanded}>Home</NavLink>
        </NavItem>
        <NavItem
          onMouseEnter={() => setWorkOpen(true)}
          onMouseLeave={() => setWorkOpen(false)}
          onFocus={() => setWorkOpen(true)}
          onBlur={() => setWorkOpen(false)}
        >
          <NavLink to="/work" $active={isWorkPage} $expanded={expanded} aria-haspopup="true" aria-expanded={workOpen && expanded}>
            Work
          </NavLink>
          <SubNavList $show={workOpen} $expanded={expanded} role="menu">
            {workSections.map(section => (
              <li key={section.id}>
                <SubNavLink
                  href={`#${section.id}`}
                  tabIndex={workOpen && expanded ? 0 : -1}
                  role="menuitem"
                >
                  {section.label}
                </SubNavLink>
              </li>
            ))}
          </SubNavList>
        </NavItem>
        <NavItem>
          <NavLink to="/about" $active={location.pathname === '/about'} $expanded={expanded}>About Me</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact" $active={location.pathname === '/contact'} $expanded={expanded}>Contact</NavLink>
        </NavItem>
      </NavList>
    </Sidebar>
  );
};
