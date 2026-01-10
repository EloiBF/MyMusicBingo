import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    User, Mail, Settings as SettingsIcon, LogOut, CheckCircle2, AlertCircle, Lock, Eye, EyeOff
} from 'lucide-react';
import api from '../api';
import PageLayout from '../components/PageLayout';
import ConfirmationModal from '../components/ConfirmationModal';

const Settings = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false
    });
    const [changingPassword, setChangingPassword] = useState(false);

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        confirmText: '',
        confirmColor: '',
        icon: null
    });

    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

    useEffect(() => {
        fetchUser();
    }, [searchParams]);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await api.get('/auth/me/');
            setUser(response.data);
        } catch (err) {
            console.error('Error fetching user:', err);
            setMessage({ text: 'Failed to load user profile.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const confirmLogout = () => {
        setModalConfig({
            isOpen: true,
            title: 'Sign Out?',
            message: 'Are you sure you want to sign out of your account? You will need to log in again to access your bingos.',
            confirmText: 'Sign Out',
            confirmColor: 'var(--text)',
            icon: <LogOut size={44} />,
            onConfirm: handleLogout
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.new_password !== passwordData.confirm_password) {
            setMessage({ text: 'New passwords do not match.', type: 'error' });
            return;
        }

        if (passwordData.new_password.length < 8) {
            setMessage({ text: 'Password must be at least 8 characters long.', type: 'error' });
            return;
        }

        setChangingPassword(true);
        try {
            await api.post('/auth/change_password/', passwordData);
            setMessage({ text: 'Password changed successfully!', type: 'success' });
            setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Failed to change password.', type: 'error' });
        } finally {
            setChangingPassword(false);
        }
    };

    const handlePasswordInputChange = (field, value) => {
        setPasswordData(prev => ({ ...prev, [field]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading settings...</div>;

    return (
        <PageLayout
            title="Account Settings"
            subtitle="Manage your profile and security settings."
            icon={<SettingsIcon size={32} />}
        >
            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
                confirmText={modalConfig.confirmText}
                confirmColor={modalConfig.confirmColor}
                icon={modalConfig.icon}
                isLoading={false}
            />

            {message.text && (
                <div style={{
                    padding: '1rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: message.type === 'success' ? 'var(--success-bg)' :
                        message.type === 'error' ? 'var(--error-bg)' : 'var(--info-bg)',
                    border: `1px solid ${message.type === 'success' ? 'hsla(142, 76%, 36%, 0.2)' :
                        message.type === 'error' ? 'hsla(0, 84%, 60%, 0.2)' : 'hsla(217, 91%, 60%, 0.2)'}`,
                    color: message.type === 'success' ? 'var(--success)' :
                        message.type === 'error' ? 'var(--error)' : 'var(--info)',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> :
                        message.type === 'error' ? <AlertCircle size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </div>
            )}

            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Profile Section */}
                <section className="glass" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>Personal Information</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Username</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'var(--surface-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                                <User size={16} color="var(--primary)" />
                                <span>{user.username}</span>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'var(--surface-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                                <Mail size={16} color="var(--primary)" />
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Change Password Section */}
                <section className="glass" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>Change Password</h2>
                    <form onSubmit={handlePasswordChange} style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Current Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPasswords.old ? 'text' : 'password'}
                                    value={passwordData.old_password}
                                    onChange={(e) => handlePasswordInputChange('old_password', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                                        background: 'var(--surface-light)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '1rem',
                                        color: 'var(--text)'
                                    }}
                                    placeholder="Enter current password"
                                />
                                <Lock size={16} color="var(--primary)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('old')}
                                    style={{
                                        position: 'absolute',
                                        right: '0.75rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text-muted)'
                                    }}
                                >
                                    {showPasswords.old ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPasswords.new ? 'text' : 'password'}
                                    value={passwordData.new_password}
                                    onChange={(e) => handlePasswordInputChange('new_password', e.target.value)}
                                    required
                                    minLength="8"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                                        background: 'var(--surface-light)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '1rem',
                                        color: 'var(--text)'
                                    }}
                                    placeholder="Enter new password (min. 8 characters)"
                                />
                                <Lock size={16} color="var(--primary)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    style={{
                                        position: 'absolute',
                                        right: '0.75rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text-muted)'
                                    }}
                                >
                                    {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm New Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    value={passwordData.confirm_password}
                                    onChange={(e) => handlePasswordInputChange('confirm_password', e.target.value)}
                                    required
                                    minLength="8"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                                        background: 'var(--surface-light)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '1rem',
                                        color: 'var(--text)'
                                    }}
                                    placeholder="Confirm new password"
                                />
                                <Lock size={16} color="var(--primary)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    style={{
                                        position: 'absolute',
                                        right: '0.75rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--text-muted)'
                                    }}
                                >
                                    {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button
                                type="button"
                                onClick={() => setPasswordData({ old_password: '', new_password: '', confirm_password: '' })}
                                className="btn btn-secondary"
                                style={{ borderRadius: '0.75rem' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={changingPassword || !passwordData.old_password || !passwordData.new_password || !passwordData.confirm_password}
                                className="btn btn-primary"
                                style={{ borderRadius: '0.75rem', gap: '0.5rem' }}
                            >
                                <Lock size={16} />
                                {changingPassword ? 'Changing...' : 'Change Password'}
                            </button>
                        </div>
                    </form>
                </section>

                {/* Dangerous Zone */}
                <section className="glass" style={{ padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--error)' }}>Session Management</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Logging out will end your current session. You will need to sign in again to access My Bingos.
                    </p>
                    <button
                        onClick={confirmLogout}
                        className="btn btn-secondary"
                        style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)' }}
                    >
                        <LogOut size={18} /> Sign Out of All Devices
                    </button>
                </section>
            </div>
        </PageLayout>
    );
};

export default Settings;
