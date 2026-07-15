# StudyNest Frontend - Clean Architecture Documentation

## Overview

StudyNest frontend follows **component-based architecture** with clean separation of concerns. This ensures code maintainability, reusability, and scalability.

### Architecture Layers

```
┌──────────────────────────────────────┐
│   Pages Layer (Route Components)     │
│   - Top-level page components        │
│   - Handles page logic               │
└────────────┬─────────────────────────┘
             │
┌────────────▼─────────────────────────┐
│   Components Layer                   │
│   - Layout (Navbar, Footer)          │
│   - UI (Cards, Buttons, Forms)       │
│   - Sections (Home page sections)    │
└────────────┬─────────────────────────┘
             │
┌────────────▼─────────────────────────┐
│   Context Layer (State Management)   │
│   - AuthContext (Global user state)  │
│   - Global data sharing              │
└────────────┬─────────────────────────┘
             │
┌────────────▼─────────────────────────┐
│   API Layer (Data Fetching)          │
│   - Axios instances                  │
│   - API calls                        │
│   - Request/response handling        │
└────────────┬─────────────────────────┘
             │
┌────────────▼─────────────────────────┐
│   Types Layer                        │
│   - TypeScript interfaces            │
│   - Type definitions                 │
└──────────────────────────────────────┘
```

## Directory Structure

```
src/
├── api/                      # API communication layer
│   ├── resources.ts         # Resource API calls
│   ├── studyGroups.ts       # Study Groups API calls
│   ├── tutors.ts            # Tutors API calls
│   └── auth.ts              # Auth API calls
│
├── components/
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── Footer.tsx       # Footer
│   │
│   ├── ui/                  # Reusable UI components
│   │   ├── ResourceCard.tsx
│   │   ├── SkeletonCard.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   │
│   └── sections/            # Home page sections
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       ├── ResourcesSection.tsx
│       ├── TestimonialsSection.tsx
│       └── CTASection.tsx
│
├── context/                 # Context/State management
│   └── AuthContext.tsx      # Global auth state
│
├── pages/                   # Page components (routes)
│   ├── Home.tsx
│   ├── Explore.tsx
│   ├── ResourceDetails.tsx
│   ├── AddResource.tsx
│   ├── ManageResources.tsx
│   ├── StudyGroups.tsx
│   ├── StudyGroupDetails.tsx
│   ├── Tutors.tsx
│   ├── TutorDetails.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── Admin.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Blog.tsx
│   ├── PrivacyTerms.tsx
│   └── NotFound.tsx
│
├── types/                   # TypeScript interfaces
│   └── index.ts            # All type definitions
│
├── constants/               # Constants
│   └── index.ts            # Categories, subjects, etc.
│
├── config/                  # Configuration
│   └── firebase.ts         # Firebase config
│
├── App.tsx                  # Main app component
├── main.tsx                 # React entry point
└── index.css                # Global styles

public/
└── index.html               # HTML template
```

## Layer Responsibilities

### 1. Pages Layer (`pages/`)
**Purpose**: Top-level route components

```typescript
// Example: Explore.tsx
export default function Explore() {
  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState({ category: '', price: '' });
  
  useEffect(() => {
    // Fetch from API
    fetchResources(filters);
  }, [filters]);

  return (
    <div>
      <SearchBar />
      <FilterPanel onChange={setFilters} />
      <ResourceGrid resources={resources} />
    </div>
  );
}
```

**Responsibilities:**
- ✅ Manage page-level state
- ✅ Fetch data from APIs
- ✅ Compose child components
- ❌ NO business logic
- ❌ NO direct database access

---

### 2. Components Layer (`components/`)
**Purpose**: Reusable UI and feature components

#### Layout Components
```typescript
// Navbar.tsx - Navigation
export default function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="navbar">
      <Logo />
      <NavLinks user={user} />
      {user && <UserMenu onLogout={logout} />}
    </nav>
  );
}
```

#### UI Components
```typescript
// ResourceCard.tsx - Reusable card
interface ResourceCardProps {
  resource: Resource;
  onViewDetails: (id: string) => void;
}

export default function ResourceCard({ resource, onViewDetails }: ResourceCardProps) {
  return (
    <div className="card">
      <img src={resource.coverImageUrl} alt={resource.title} />
      <h3>{resource.title}</h3>
      <p>{resource.shortDescription}</p>
      <button onClick={() => onViewDetails(resource._id)}>View Details</button>
    </div>
  );
}
```

#### Section Components
```typescript
// HeroSection.tsx - Homepage section
export default function HeroSection() {
  return (
    <section className="hero">
      <h1>Welcome to StudyNest</h1>
      <p>Your learning hub for shared knowledge</p>
      <CTA />
    </section>
  );
}
```

**Responsibilities:**
- ✅ Accept props for data & callbacks
- ✅ Render UI
- ✅ Handle local component state
- ✅ Emit events via callbacks
- ❌ NO page logic
- ❌ NO data fetching

---

### 3. Context Layer (`context/`)
**Purpose**: Global state management

```typescript
// AuthContext.tsx
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginAPI(email, password);
    setUser(response.user);
  };

  const logout = () => {
    setUser(null);
    logoutAPI();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
```

**Responsibilities:**
- ✅ Manage global application state
- ✅ Provide context to components
- ✅ Handle state updates
- ❌ NO business logic
- ❌ NO UI rendering

---

### 4. API Layer (`api/`)
**Purpose**: Data fetching and HTTP communication

```typescript
// resources.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const resourceAPI = {
  getAll: async (filters?: FilterOptions) => {
    const { data } = await axios.get(`${API_URL}/api/resources`, { params: filters });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axios.get(`${API_URL}/api/resources/${id}`);
    return data;
  },

  create: async (resource: CreateResourceInput) => {
    const { data } = await axios.post(`${API_URL}/api/resources`, resource);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await axios.delete(`${API_URL}/api/resources/${id}`);
    return data;
  },

  addReview: async (id: string, review: ReviewInput) => {
    const { data } = await axios.post(`${API_URL}/api/resources/${id}/reviews`, review);
    return data;
  },
};
```

**Responsibilities:**
- ✅ Make HTTP requests
- ✅ Handle responses
- ✅ Error handling
- ✅ Centralize API calls
- ❌ NO business logic
- ❌ NO state management

---

### 5. Types Layer (`types/`)
**Purpose**: TypeScript interfaces for type safety

```typescript
// index.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  isTutor: boolean;
  avatarUrl: string;
}

export interface Resource {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  subject: string;
  resourceType: 'notes' | 'slides' | 'book' | 'video';
  priceType: 'free' | 'paid';
  price: number;
  coverImageUrl: string;
  uploader: User;
  avgRating: number;
  reviewCount: number;
  createdAt: string;
}

export interface StudyGroup {
  _id: string;
  name: string;
  subject: string;
  description: string;
  creator: User;
  members: User[];
  meetingSchedule: string;
  createdAt: string;
}
```

**Responsibilities:**
- ✅ Define TypeScript interfaces
- ✅ Ensure type safety
- ✅ Document data structures
- ❌ NO implementation

---

## Data Flow Example: Viewing Resources

```
User clicks "Browse Resources" → Home page
           ↓
Explore.tsx (page)
  ├─ useAuth() - Get current user from context
  ├─ useState() - Manage filters & resources
  ├─ useEffect() - Fetch on mount & filter change
  │   └─ resourceAPI.getAll(filters) - Call API
  │       └─ axios.get() - Make HTTP request
  │           └─ Backend API returns data
  │       └─ setResources() - Update state
  ├─ Render <ResourceGrid>
  │   └─ Map resources → <ResourceCard />
  │       └─ onClick → Navigate to ResourceDetails
  └─ Return JSX
```

---

## Authentication Flow

```
1. User enters email/password
         ↓
2. Login.tsx → authAPI.login(email, password)
         ↓
3. API sends request to backend
         ↓
4. Backend validates & returns JWT token + user
         ↓
5. authAPI stores token in localStorage
         ↓
6. AuthContext.login() updates global user state
         ↓
7. ProtectedRoute checks user && redirects
         ↓
8. User can now access protected pages
```

---

## Component Reusability

### Button Component
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Usage
<Button variant="primary" size="lg" onClick={handleSubmit}>
  Submit
</Button>

<Button variant="danger" size="sm" disabled={loading}>
  Delete
</Button>
```

---

## State Management Pattern

```typescript
// Page component manages data state
const [resources, setResources] = useState<Resource[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Fetch on mount
useEffect(() => {
  setLoading(true);
  resourceAPI.getAll()
    .then(setResources)
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, []);

// Pass to child components via props
<ResourceGrid 
  resources={resources} 
  loading={loading} 
  error={error}
/>
```

---

## Production-Ready Features

✅ **TypeScript Strict Mode**
- All component props typed
- Return types defined
- No implicit `any`

✅ **Error Handling**
- API call error handling
- User-friendly error messages
- Fallback UI for loading states

✅ **Performance**
- Memoized components
- Lazy loading routes
- Optimized re-renders

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation

✅ **Security**
- Protected routes
- JWT token handling
- CORS-safe API calls

---

## Development Best Practices

### 1. Component Organization
```
Each component in its own file
Clear naming (PascalCase for components)
Props interface clearly defined
Export at bottom
```

### 2. Hook Usage
```typescript
// ✅ Good
export default function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile(user.id);
  }, [user.id]);

  return <div>{/* ... */}</div>;
}

// ❌ Bad
export default function UserProfile() {
  // Mixed concerns, unclear dependencies
}
```

### 3. API Calls
```typescript
// ✅ Good - All API calls in api/ folder
const response = await resourceAPI.getAll();

// ❌ Bad - Direct axios in component
const response = await axios.get('/api/resources');
```

---

## Deployment

```bash
# Build for production
npm run build

# Output: dist/ folder optimized for Vercel

# Vercel automatically deploys on git push
# Environment variables set in Vercel dashboard
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot find module` | Run `npm install` |
| `CORS errors` | Check API URL in `.env` |
| `Auth state lost on refresh` | Check localStorage token handling |
| `Styles not applying` | Verify Tailwind CSS build |
| `TypeScript errors` | Run `npm run build` to see all errors |

---

This architecture ensures **maintainability**, **reusability**, and **scalability** while keeping the frontend code organized and easy to test.
