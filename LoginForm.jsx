import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ selectedUser, onLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.username?.trim()) {
      newErrors.username = 'Το όνομα χρήστη είναι υποχρεωτικό';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Ο κωδικός πρόσβασης είναι υποχρεωτικός';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onLogin(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      <Input
        label="Όνομα Χρήστη"
        type="text"
        name="username"
        placeholder="Εισάγετε το όνομα χρήστη σας"
        value={formData?.username}
        onChange={handleChange}
        error={errors?.username}
        required
        disabled={isLoading}
        className="w-full"
      />
      <div className="relative">
        <Input
          label="Κωδικός Πρόσβασης"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Εισάγετε τον κωδικό πρόσβασης σας"
          value={formData?.password}
          onChange={handleChange}
          error={errors?.password}
          required
          disabled={isLoading}
          className="w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 p-2 text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
          aria-label={showPassword ? 'Απόκρυψη κωδικού' : 'Εμφάνιση κωδικού'}
          disabled={isLoading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} strokeWidth={2} />
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={!selectedUser || isLoading}
        iconName="LogIn"
        iconPosition="right"
        className="mt-6"
      >
        Σύνδεση
      </Button>
    </form>
  );
};

export default LoginForm;
