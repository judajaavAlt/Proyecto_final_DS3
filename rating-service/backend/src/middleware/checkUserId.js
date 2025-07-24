export function checkUserId(req, res, next) {
  const userId = req.header('x-user-id');
  console.log('Header x-user-id recibido:', userId);
  if (!userId) {
    return res.status(401).json({ error: 'User not authenticatedddd' });
  }
  req.userId = parseInt(userId);
  next();
}

