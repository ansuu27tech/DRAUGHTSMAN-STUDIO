import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { fetchAPI, postAPI } from '../lib/api';

// Custom CSS for floating labels and phone input override
const customStyles = `
  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }
  .form-input {
    width: 100%;
    padding: 1.2rem 1rem 0.6rem;
    background: #1B1F25;
    border: 1px solid #2A2F36;
    border-radius: 8px;
    color: #F5F5F5;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
    min-height: 3.5rem;
  }
  .form-input:focus {
    border-color: #C6A969;
    box-shadow: 0 0 0 2px rgba(198, 169, 105, 0.2);
  }
  .form-label {
    position: absolute;
    left: 1rem;
    top: 1.1rem;
    color: #888;
    font-size: 1rem;
    pointer-events: none;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  .form-input:focus ~ .form-label,
  .form-input:not(:placeholder-shown) ~ .form-label {
    top: 0.4rem;
    font-size: 0.75rem;
    color: #C6A969;
    font-weight: 700;
  }
  
  /* Phone Input Customization */
  .react-tel-input .form-control {
    width: 100% !important;
    padding: 1.2rem 1rem 0.6rem 3.5rem !important;
    background: #1B1F25 !important;
    border: 1px solid #2A2F36 !important;
    border-radius: 8px !important;
    color: #F5F5F5 !important;
    font-size: 1rem !important;
    height: 3.5rem !important;
  }
  .react-tel-input .form-control:focus {
    border-color: #C6A969 !important;
    box-shadow: 0 0 0 2px rgba(198, 169, 105, 0.2) !important;
  }
  .react-tel-input .flag-dropdown {
    background: #1B1F25 !important;
    border: 1px solid #2A2F36 !important;
    border-right: none !important;
    border-radius: 8px 0 0 8px !important;
  }
  .react-tel-input .selected-flag:hover, 
  .react-tel-input .selected-flag:focus {
    background: #2A2F36 !important;
  }
  .react-tel-input .country-list {
    background: #1B1F25 !important;
    color: #F5F5F5 !important;
    border: 1px solid #2A2F36 !important;
  }
  .react-tel-input .country-list .country:hover {
    background: #2A2F36 !important;
  }
  .react-tel-input .country-list .country.highlight {
    background: #2A2F36 !important;
  }
`;

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        projectDescription: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [projectCategory, setProjectCategory] = useState('');
    
    // Dynamic contact info from admin
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await fetchAPI('/about');
            if (data && !data.error) {
                setContactInfo(data);
            }
        })();
    }, []);

    // Dynamic contact details with fallbacks
    const address = contactInfo?.address || "No,1131, Vedachalam Main Road,\nAdhanur, Guduvanchery,\nChengalpattu - 603202";
    const phone = contactInfo?.phone || "+91 91765 61515";
    const email = contactInfo?.email || "contact@draughtsmanstudio.com";

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneChange = (value) => {
        setFormState({
            ...formState,
            phone: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Send via FormSubmit (email notification)
            const formData = new URLSearchParams();
            formData.append('name', formState.name);
            formData.append('email', formState.email);
            formData.append('phone', formState.phone);
            formData.append('projectType', formState.projectDescription);
            formData.append('message', formState.message);
            formData.append('_subject', `New Project Inquiry from ${formState.name}`);
            formData.append('_captcha', 'false');
            formData.append('_template', 'table');

            const response = await fetch("https://formsubmit.co/ajax/draughtsmanstudiomd@gmail.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });

            // 2. Also save to Supabase via admin panel API (for dashboard visibility)
            postAPI('/contact', {
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                projectType: formState.projectDescription,
                message: formState.message,
            }).catch(err => console.warn('Failed to save to database:', err));

            if (response.ok) {
                setIsSuccess(true);
                setFormState({ name: '', email: '', phone: '', projectDescription: '', message: '' });
                setProjectCategory('');
            } else {
                alert("There was an issue sending your message. Please email us directly at contact@draughtsmanstudio.com");
            }
        } catch (error) {
            alert("Error sending message. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SectionWrapper id="contact" title="CONTACT" subtitle="Let's Connect & Collaborate">
            <style>{customStyles}</style>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '4rem',
                marginTop: '3rem',
                alignItems: 'start'
            }}>

                {/* Left Side: Narrative & Details */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        letterSpacing: '-1px',
                        color: '#F5F5F5'
                    }}>
                        Get In Touch <br />
                        <span style={{ color: '#C6A969' }}>Start Your Project</span>
                    </h3>

                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#A0A0A0',
                        marginBottom: '3rem',
                        maxWidth: '500px'
                    }}>
                        Ready to bring your architectural vision to life? Fill out the form or contact us directly. We look forward to collaborating with you.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <ContactItem
                            icon={MapPin}
                            label="Address"
                            lines={address.split('\n').length > 1 ? address.split('\n') : [
                                "No,1131, Vedachalam Main Road,",
                                "Adhanur, Guduvanchery,",
                                "Chengalpattu - 603202"
                            ]}
                        />
                        <ContactItem
                            icon={Phone}
                            label="Phone"
                            lines={[phone]}
                            isLink
                            href={`tel:${phone.replace(/\s/g, '')}`}
                        />
                        <ContactItem
                            icon={Mail}
                            label="Email"
                            lines={[email]}
                            isLink
                            href={`mailto:${email}`}
                        />
                    </div>
                </motion.div>

                {/* Right Side: Contact Form Card */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        background: '#111418',
                        padding: '3rem 2.5rem',
                        borderRadius: '16px',
                        border: '1px solid #2A2F36',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                        position: 'relative'
                    }}
                >
                    {/* Top Beige Accent Line */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '30%',
                        height: '4px',
                        background: '#C6A969',
                        borderRadius: '0 0 4px 4px'
                    }} />

                    <h4 style={{
                        color: '#F5F5F5',
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.8rem',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}>
                        Send us a Message
                    </h4>

                    {!isSuccess ? (
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-input"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                    placeholder=" "
                                />
                                <label htmlFor="name" className="form-label">Name</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-input"
                                    required
                                    value={formState.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                />
                                <label htmlFor="email" className="form-label">Email</label>
                            </div>

                            <div className="form-group" style={{ position: 'relative' }}>
                                <label style={{
                                    position: 'absolute',
                                    top: '-0.6rem',
                                    left: '0.2rem',
                                    fontSize: '0.75rem',
                                    color: '#C6A969',
                                    fontWeight: 700,
                                    zIndex: 2
                                }}>
                                    Phone
                                </label>
                                <PhoneInput
                                    country={'in'}
                                    value={formState.phone}
                                    onChange={handlePhoneChange}
                                    enableSearch={true}
                                    disableSearchIcon={true}
                                    inputClass="form-control"
                                    containerStyle={{ width: '100%' }}
                                    dropdownStyle={{ background: '#1B1F25' }}
                                />
                            </div>

                            <div className="form-group">
                                <div style={{ position: 'relative' }}>
                                    <select
                                        name="projectCategory"
                                        id="projectCategory"
                                        className="form-input"
                                        value={projectCategory}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setProjectCategory(val);
                                            if (val !== 'Other') {
                                                setFormState({ ...formState, projectDescription: val });
                                            } else {
                                                setFormState({ ...formState, projectDescription: '' });
                                            }
                                        }}
                                        style={{ appearance: 'none', cursor: 'pointer' }}
                                        required
                                    >
                                        <option value="" disabled hidden></option>
                                        <option value="Residential Building">Residential Building</option>
                                        <option value="Commercial Building">Commercial Building</option>
                                        <option value="Interior Design">Interior Design</option>
                                        <option value="Architectural Drawings">Architectural Drawings</option>
                                        <option value="Working Drawings (GFC)">Working Drawings (GFC)</option>
                                        <option value="3D Visualization">3D Visualization</option>
                                        <option value="Renovation / Remodeling">Renovation / Remodeling</option>
                                        <option value="Approval Drawings">Approval Drawings</option>
                                        <option value="Landscape Design">Landscape Design</option>
                                        <option value="Other">Other (Type below)</option>
                                    </select>
                                    <label htmlFor="projectCategory" className="form-label" style={projectCategory ? { top: '0.4rem', fontSize: '0.75rem', color: '#C6A969', fontWeight: 700 } : {}}>Project Type</label>

                                    {/* Dropdown Icon */}
                                    <div style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none',
                                        color: '#C6A969'
                                    }}>
                                        ▼
                                    </div>
                                </div>
                            </div>

                            {projectCategory === 'Other' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="form-group"
                                >
                                    <input
                                        type="text"
                                        name="projectDescription"
                                        id="projectDescription"
                                        className="form-input"
                                        value={formState.projectDescription}
                                        onChange={handleChange}
                                        placeholder=" "
                                        autoFocus
                                        required
                                    />
                                    <label htmlFor="projectDescription" className="form-label">Please specify Project Type</label>
                                </motion.div>
                            )}

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    className="form-input"
                                    value={formState.message}
                                    onChange={handleChange}
                                    placeholder=" "
                                    style={{ resize: 'vertical', minHeight: '8rem' }}
                                ></textarea>
                                <label htmlFor="message" className="form-label">Message</label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem',
                                    background: '#C6A969',
                                    color: '#111418',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    cursor: isSubmitting ? 'wait' : 'pointer',
                                    marginTop: '1rem',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    boxShadow: '0 4px 15px rgba(198, 169, 105, 0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#D4B87A';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(198, 169, 105, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#C6A969';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(198, 169, 105, 0.3)';
                                }}
                            >
                                {isSubmitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        SEND MESSAGE <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'rgba(198, 169, 105, 0.2)',
                                color: '#C6A969',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                fontSize: '2.5rem'
                            }}>✓</div>
                            <h3 style={{ color: '#F5F5F5', marginBottom: '1rem', fontFamily: '"Playfair Display", serif' }}>Message Sent!</h3>
                            <p style={{ color: '#A0A0A0', lineHeight: 1.6 }}>
                                Thank you! Your message has been sent successfully. <br />
                                We will get back to you shortly.
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                style={{
                                    marginTop: '2rem',
                                    background: 'transparent',
                                    border: '1px solid #C6A969',
                                    color: '#C6A969',
                                    padding: '0.8rem 2rem',
                                    borderRadius: '30px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#C6A969';
                                    e.target.style.color = '#111418';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.color = '#C6A969';
                                }}
                            >
                                Send another
                            </button>
                        </div>
                    )}
                </motion.div>

            </div>
        </SectionWrapper>
    );
};

const ContactItem = ({ icon: Icon, label, lines, isLink, href }) => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{
            padding: '12px',
            border: '1px solid #3A3F48',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#C6A969',
            background: '#1B1F25'
        }}>
            <Icon size={22} />
        </div>
        <div>
            <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '0.6rem',
                color: '#F5F5F5',
                fontWeight: 700
            }}>
                {label}
            </h4>
            <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                color: '#B0B0B0',
                lineHeight: '1.6'
            }}>
                {isLink ? (
                    <a href={href} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = '#C6A969'}
                        onMouseLeave={(e) => e.target.style.color = 'inherit'}
                    >
                        {lines.map((line, i) => <div key={i}>{line}</div>)}
                    </a>
                ) : (
                    lines.map((line, i) => <div key={i}>{line}</div>)
                )}
            </div>
        </div>
    </div>
);

export default Contact;
