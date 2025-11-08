import 'package:flutter/material.dart';
import '../api_client.dart';

class VerifyEmailScreen extends StatefulWidget {
  const VerifyEmailScreen({super.key});
  @override
  State<VerifyEmailScreen> createState() => _VerifyEmailScreenState();
}

class _VerifyEmailScreenState extends State<VerifyEmailScreen> {
  final _tokenCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  bool _busy = false;
  String? _msg;

  Future<void> _requestVerify() async {
    setState((){ _busy = true; _msg = null; });
    try {
      final ok = await ApiClient().requestVerifyEmail();
      setState((){ _msg = ok ? 'Verification email sent (or token logged on server)' : 'Failed to send verification email'; });
    } catch (e) {
      setState((){ _msg = 'Error: $e'; });
    } finally { setState((){ _busy = false; }); }
  }

  Future<void> _verify() async {
    final token = _tokenCtrl.text.trim();
    if (token.isEmpty) { setState(()=> _msg = 'Enter token'); return; }
    setState((){ _busy = true; _msg = null; });
    try {
      final ok = await ApiClient().verifyEmail(token);
      setState((){ _msg = ok ? 'Email verified successfully' : 'Invalid or expired token'; });
    } catch (e) {
      setState((){ _msg = 'Error: $e'; });
    } finally { setState((){ _busy = false; }); }
  }

  Future<void> _requestReset() async {
    final email = _emailCtrl.text.trim();
    if (email.isEmpty) { setState(()=> _msg = 'Enter email'); return; }
    setState((){ _busy = true; _msg = null; });
    try {
      final ok = await ApiClient().requestPasswordReset(email);
      setState((){ _msg = ok ? 'Reset email sent (or token logged on server)' : 'Failed to send reset email'; });
    } catch (e) {
      setState((){ _msg = 'Error: $e'; });
    } finally { setState((){ _busy = false; }); }
  }

  Future<void> _resetPassword() async {
    final token = _tokenCtrl.text.trim();
    if (token.isEmpty) { setState(()=> _msg = 'Enter reset token'); return; }
    final newPwd = await showDialog<String>(context: context, builder: (_) => const _PwdDialog());
    if (newPwd == null || newPwd.trim().isEmpty) return;
    setState((){ _busy = true; _msg = null; });
    try {
      final ok = await ApiClient().resetPassword(token, newPwd.trim());
      setState((){ _msg = ok ? 'Password changed' : 'Invalid or expired token'; });
    } catch (e) {
      setState((){ _msg = 'Error: $e'; });
    } finally { setState((){ _busy = false; }); }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Verify Email / Reset Password')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (_msg != null) Text(_msg!, style: const TextStyle(color: Colors.indigo)),
            const SizedBox(height: 8),
            const Text('Email verification', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Row(children: [
              Expanded(child: TextField(controller: _tokenCtrl, decoration: const InputDecoration(labelText: 'Verification/Reset token'))),
              const SizedBox(width: 8),
              ElevatedButton(onPressed: _busy ? null : _verify, child: const Text('Verify')),
            ]),
            const SizedBox(height: 6),
            ElevatedButton(onPressed: _busy ? null : _requestVerify, child: const Text('Request verification email')),
            const Divider(height: 24),
            const Text('Password reset', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            TextField(controller: _emailCtrl, decoration: const InputDecoration(labelText: 'Your email')),
            const SizedBox(height: 6),
            Row(children: [
              ElevatedButton(onPressed: _busy ? null : _requestReset, child: const Text('Request reset')),
              const SizedBox(width: 8),
              ElevatedButton(onPressed: _busy ? null : _resetPassword, child: const Text('Apply reset')),
            ]),
            const SizedBox(height: 8),
            const Text('Tip: If email is not configured on the server, check API logs for tokens and paste them here.'),
          ],
        ),
      ),
    );
  }
}

class _PwdDialog extends StatefulWidget {
  const _PwdDialog();
  @override
  State<_PwdDialog> createState() => _PwdDialogState();
}

class _PwdDialogState extends State<_PwdDialog> {
  final _ctrl = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('New password'),
      content: TextField(controller: _ctrl, obscureText: true, decoration: const InputDecoration(labelText: 'New password (min 6 chars)')),
      actions: [
        TextButton(onPressed: ()=> Navigator.pop(context), child: const Text('Cancel')),
        ElevatedButton(onPressed: ()=> Navigator.pop(context, _ctrl.text), child: const Text('Apply')),
      ],
    );
  }
}

