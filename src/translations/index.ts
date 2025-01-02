interface Translations {
  [key: string]: {
    common: {
      user: string
      loading: string
      error: string
      save: string
      cancel: string
      edit: string
      delete: string
      success: string
      welcome: string
      developedBy: string
      next: string
      saving: string
      notAuthenticated: string
      actions: string
    }
    auth: {
      signIn: string
      signUp: string
      signOut: string
      email: string
      password: string
      name: string
      createAccount: string
      alreadyHaveAccount: string
      dontHaveAccount: string
    }
    timeTracker: {
      title: string
      addEntry: string
      date: string
      hours: string
      description: string
      hourlyRate: string
      total: string
      entries: string
      rateSettings: string
      editRateSettings: string
      currency: string
      settings: {
        title: string
        edit: string
        hourlyRateLabel: string
      }
      editEntry: string
      timer: {
        title: string
        start: string
        stop: string
        reset: string
        earnings: string
      }
      saveEntry: {
        title: string
        save: string
        descriptionPlaceholder: string
      }
      hoursUnit: string
      earnings: string
      deleteConfirm: string
    }
    toast: {
      entryUpdated: string
      entryUpdateError: string
      rateUpdated: string
      rateUpdateError: string
      projectCreated: string
      projectCreateError: string
      projectUpdated: string
      projectUpdateError: string
      projectDeleted: string
      projectDeleteError: string
    }
    projects: {
      title: string
      createNew: string
      edit: string
      delete: string
      name: string
      description: string
      color: string
      select: string
      noProjects: string
      confirmDelete: string
      all: string
      search: string
      noResults: string
      create: string
      filter: string
      selectProject: string
      required: string
    }
    invoices: {
      title: string
      create: string
      list: string
      number: string
      date: string
      dueDate: string
      client: string
      total: string
      statusLabel: string
      clientName: string
      clientAddress: string
      clientEmail: string
      clientVAT: string
      companyName: string
      companyAddress: string
      companyVAT: string
      companyEmail: string
      bankDetails: string
      bankName: string
      bankAccount: string
      notes: string
      terms: string
      from: string
      to: string
      amount: string
      subtotal: string
      tax: string
      saved: string
      saveError: string
      pdfError: string
      download: string
      basicInfo: string
      additionalInfo: string
      projectDetails: string
      clientDetails: string
      companyDetails: string
      tabs: {
        details: string
        editor: string
        preview: string
      }
      status: {
        draft: string
        sent: string
        paid: string
      }
      search: string
      filterStatus: string
      statusAll: string
      statusDraft: string
      statusSent: string
      statusPaid: string
      noMatchingInvoices: string
      noInvoices: string
      loadError: string
      edit: string
      deleteConfirmTitle: string
      deleteConfirmDescription: string
      deleted: string
      deleteError: string
    }
  }
}

export const translations: Translations = {
  en: {
    common: {
      user: 'User',
      loading: 'Loading...',
      error: 'Error',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      success: 'Success',
      welcome: 'Welcome',
      developedBy: 'Developed by TimeSaverHub',
      next: 'Next',
      saving: 'Saving...',
      notAuthenticated: 'You are not logged in',
      actions: 'Actions',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      createAccount: 'Create an account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
    },
    timeTracker: {
      title: 'Time Tracker',
      addEntry: 'Add Entry',
      date: 'Date',
      hours: 'Hours',
      description: 'Description',
      hourlyRate: 'Hourly Rate',
      total: 'Total',
      entries: 'Time Entries',
      rateSettings: 'Rate Settings',
      editRateSettings: 'Edit Rate Settings',
      currency: 'Currency',
      settings: {
        title: 'Rate Settings',
        edit: 'Edit Rate Settings',
        hourlyRateLabel: 'Hourly Rate:',
      },
      editEntry: 'Edit Time Entry',
      timer: {
        title: 'Time Tracker',
        start: 'Start',
        stop: 'Stop',
        reset: 'Reset',
        earnings: 'Earnings'
      },
      saveEntry: {
        title: 'Save Time Entry',
        save: 'Save Entry',
        descriptionPlaceholder: 'What did you work on?'
      },
      hoursUnit: 'hours',
      earnings: 'Earnings',
      deleteConfirm: 'Are you sure you want to delete this time entry?'
    },
    toast: {
      entryUpdated: 'Time entry updated successfully',
      entryUpdateError: 'Failed to update time entry',
      rateUpdated: 'Rate settings updated successfully',
      rateUpdateError: 'Failed to update rate settings',
      projectCreated: 'Project created successfully',
      projectCreateError: 'Failed to create project',
      projectUpdated: 'Project updated successfully',
      projectUpdateError: 'Failed to update project',
      projectDeleted: 'Project deleted successfully',
      projectDeleteError: 'Failed to delete project'
    },
    projects: {
      title: 'Projects',
      createNew: 'New Project',
      edit: 'Edit Project',
      delete: 'Delete Project',
      name: 'Project Name',
      description: 'Description',
      color: 'Color',
      select: 'Select Project',
      noProjects: 'No projects yet. Create your first project!',
      confirmDelete: 'Are you sure you want to delete this project?',
      all: 'All Projects',
      search: 'Search projects...',
      noResults: 'No projects found',
      create: 'Create Project',
      filter: 'Filter by project',
      selectProject: 'Select a project',
      required: 'Please select a project'
    },
    invoices: {
      title: 'Invoice',
      create: 'Create Invoice',
      list: 'Invoices',
      number: 'Invoice Number',
      date: 'Invoice Date',
      dueDate: 'Due Date',
      client: 'Client',
      total: 'Total',
      statusLabel: 'Status',
      clientName: 'Client Name',
      clientAddress: 'Client Address',
      clientEmail: 'Client Email',
      clientVAT: 'Client VAT Number',
      companyName: 'Company Name',
      companyAddress: 'Company Address',
      companyVAT: 'Company VAT Number',
      companyEmail: 'Company Email',
      bankDetails: 'Bank Details',
      bankName: 'Bank Name',
      bankAccount: 'Account Number',
      notes: 'Notes',
      terms: 'Terms & Conditions',
      from: 'From',
      to: 'To',
      amount: 'Amount',
      subtotal: 'Subtotal',
      tax: 'Tax',
      saved: 'Invoice saved successfully',
      saveError: 'Failed to save invoice',
      pdfError: 'Failed to generate PDF',
      download: 'Download PDF',
      basicInfo: 'Basic Information',
      additionalInfo: 'Additional Information',
      projectDetails: 'Project Details',
      clientDetails: 'Client Details',
      companyDetails: 'Company Details',
      tabs: {
        details: 'Details',
        editor: 'Template',
        preview: 'Preview'
      },
      status: {
        draft: 'Draft',
        sent: 'Sent',
        paid: 'Paid'
      },
      search: 'Search',
      filterStatus: 'Filter by status',
      statusAll: 'All',
      statusDraft: 'Draft',
      statusSent: 'Sent',
      statusPaid: 'Paid',
      noMatchingInvoices: 'No matching invoices found',
      noInvoices: 'No invoices yet',
      loadError: 'Error loading invoices',
      edit: 'Edit Invoice',
      deleteConfirmTitle: 'Delete Invoice',
      deleteConfirmDescription: 'Are you sure you want to delete this invoice? This action cannot be undone.',
      deleted: 'Invoice deleted successfully',
      deleteError: 'Failed to delete invoice'
    }
  },
  nl: {
    common: {
      user: 'Gebruiker',
      loading: 'Laden...',
      error: 'Fout',
      save: 'Opslaan',
      cancel: 'Annuleren',
      edit: 'Bewerken',
      delete: 'Verwijderen',
      success: 'Succes',
      welcome: 'Welkom',
      developedBy: 'Ontwikkeld door TimeSaverHub',
      next: 'Volgende',
      saving: 'Opslaan...',
      notAuthenticated: 'Je bent niet ingelogd',
      actions: 'Acties',
    },
    auth: {
      signIn: 'Inloggen',
      signUp: 'Registreren',
      signOut: 'Uitloggen',
      email: 'E-mail',
      password: 'Wachtwoord',
      name: 'Volledige naam',
      createAccount: 'Account aanmaken',
      alreadyHaveAccount: 'Heb je al een account?',
      dontHaveAccount: 'Nog geen account?',
    },
    timeTracker: {
      title: 'Tijdregistratie',
      addEntry: 'Toevoegen',
      date: 'Datum',
      hours: 'Uren',
      description: 'Omschrijving',
      hourlyRate: 'Uurtarief',
      total: 'Totaal',
      entries: 'Tijdregistraties',
      rateSettings: 'Instellingen Tarief',
      editRateSettings: 'Bewerk Instellingen Tarief',
      currency: 'Valuta',
      settings: {
        title: 'Instellingen Tarief',
        edit: 'Bewerk Instellingen Tarief',
        hourlyRateLabel: 'Uurtarief:',
      },
      editEntry: 'Bewerk Tijdregistratie',
      timer: {
        title: 'Tijdklok',
        start: 'Start',
        stop: 'Stop',
        reset: 'Reset',
        earnings: 'Verdiensten'
      },
      saveEntry: {
        title: 'Tijdregistratie Opslaan',
        save: 'Opslaan',
        descriptionPlaceholder: 'Waar heb je aan gewerkt?'
      },
      hoursUnit: 'uur',
      earnings: 'Verdiensten',
      deleteConfirm: 'Weet je zeker dat je deze tijdregistratie wilt verwijderen?'
    },
    toast: {
      entryUpdated: 'Tijdregistratie succesvol bijgewerkt',
      entryUpdateError: 'Fout bij bijwerken tijdregistratie',
      rateUpdated: 'Tariefinstellingen succesvol bijgewerkt',
      rateUpdateError: 'Fout bij bijwerken tariefinstellingen',
      projectCreated: 'Project succesvol aangemaakt',
      projectCreateError: 'Fout bij aanmaken project',
      projectUpdated: 'Project succesvol bijgewerkt',
      projectUpdateError: 'Fout bij bijwerken project',
      projectDeleted: 'Project succesvol verwijderd',
      projectDeleteError: 'Fout bij verwijderen project'
    },
    projects: {
      title: 'Projecten',
      createNew: 'Nieuw Project',
      edit: 'Project Bewerken',
      delete: 'Project Verwijderen',
      name: 'Projectnaam',
      description: 'Beschrijving',
      color: 'Kleur',
      select: 'Selecteer Project',
      noProjects: 'Nog geen projecten. Maak je eerste project aan!',
      confirmDelete: 'Weet je zeker dat je dit project wilt verwijderen?',
      all: 'Alle Projecten',
      search: 'Zoek projecten...',
      noResults: 'Geen projecten gevonden',
      create: 'Project Aanmaken',
      filter: 'Filter op project',
      selectProject: 'Selecteer een project',
      required: 'Selecteer een project'
    },
    invoices: {
      title: 'Factuur',
      create: 'Factuur Maken',
      list: 'Facturen',
      number: 'Factuurnummer',
      date: 'Factuurdatum',
      dueDate: 'Vervaldatum',
      client: 'Klant',
      total: 'Totaal',
      statusLabel: 'Status',
      clientName: 'Klantnaam',
      clientAddress: 'Klantadres',
      clientEmail: 'Klant E-mail',
      clientVAT: 'Klant BTW-nummer',
      companyName: 'Bedrijfsnaam',
      companyAddress: 'Bedrijfsadres',
      companyVAT: 'Bedrijf BTW-nummer',
      companyEmail: 'Bedrijf E-mail',
      bankDetails: 'Bankgegevens',
      bankName: 'Banknaam',
      bankAccount: 'Rekeningnummer',
      notes: 'Notities',
      terms: 'Voorwaarden',
      from: 'Van',
      to: 'Aan',
      amount: 'Bedrag',
      subtotal: 'Subtotaal',
      tax: 'BTW',
      saved: 'Factuur succesvol opgeslagen',
      saveError: 'Fout bij opslaan factuur',
      pdfError: 'Fout bij genereren PDF',
      download: 'Download PDF',
      basicInfo: 'Basisinformatie',
      additionalInfo: 'Extra Informatie',
      projectDetails: 'Projectgegevens',
      clientDetails: 'Klantgegevens',
      companyDetails: 'Bedrijfsgegevens',
      tabs: {
        details: 'Details',
        editor: 'Sjabloon',
        preview: 'Voorbeeld'
      },
      status: {
        draft: 'Concept',
        sent: 'Verzonden',
        paid: 'Betaald'
      },
      search: 'Zoeken',
      filterStatus: 'Filter op status',
      statusAll: 'Alle',
      statusDraft: 'Concept',
      statusSent: 'Verzonden',
      statusPaid: 'Betaald',
      noMatchingInvoices: 'Geen facturen gevonden',
      noInvoices: 'Nog geen facturen',
      loadError: 'Fout bij laden facturen',
      edit: 'Factuur Bewerken',
      deleteConfirmTitle: 'Factuur verwijderen',
      deleteConfirmDescription: 'Weet je zeker dat je deze factuur wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.',
      deleted: 'Factuur succesvol verwijderd',
      deleteError: 'Factuur verwijderen mislukt'
    }
  }
} 