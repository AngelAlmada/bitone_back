import * as admin from 'firebase-admin';

export async function checkFirstMessageOfDay(
  db: FirebaseFirestore.Firestore,
  waId: string,
  name: string,
  phone_number: string,
): Promise<boolean> {
  // Validar waId
  if (!waId || typeof waId !== 'string' || waId.trim() === '') {
    console.error('❌ waId inválido:', waId);
    throw new Error('waId no válido. Debe ser una cadena no vacía.');
  }

  console.log('✅ Valores recibidos en checkFirstMessageOfDay:', {
    waId,
    name,
    phone_number,
  });

  const clienteRef = db.collection('whatsapp_clients').doc(waId.trim());
  const doc = await clienteRef.get();

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (!doc.exists) {
    await clienteRef.set({
      clientId: waId,
      name,
      phone_number,
      last_message: admin.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  }

  const data = doc.data();
  const lastMessage = data?.last_message?.toDate();

  if (!lastMessage || isNaN(lastMessage.getTime())) {
    // Si no hay timestamp válido, lo consideramos como primer mensaje
    await clienteRef.update({
      last_message: admin.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  }

  const fechaUltimo = new Date(lastMessage);
  fechaUltimo.setHours(0, 0, 0, 0);

  if (fechaUltimo.getTime() < hoy.getTime()) {
    await clienteRef.update({
      last_message: admin.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  }

  return false;
}
