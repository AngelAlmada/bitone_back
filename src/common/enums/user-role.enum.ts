export enum UserRole{
    ADMIN = 'AD',
    SUPERVISOR = 'SU' ,
    RECEPTIONISTS = 'RP',
    DEALER = 'RE',
    CLIENT = 'CL'
}

export enum UserStatus{
    ACTIVE = 'A',
    INACTIVE = 'I',
    DELETED = 'D'
}

export enum OrderStatus{
    CONFIRMED = 'CO',
    ACCEPTED = 'AC', 
    ASSIGNED = 'AS',
    RECEIVED = 'RE',
    CANCELED = 'CA',
    PENDING = 'PE',
    SENT = 'SE',
    LATE ='LA'
}