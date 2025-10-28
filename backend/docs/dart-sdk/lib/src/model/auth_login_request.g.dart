// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_login_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AuthLoginRequest extends AuthLoginRequest {
  @override
  final String email;
  @override
  final String password;

  factory _$AuthLoginRequest(
          [void Function(AuthLoginRequestBuilder)? updates]) =>
      (AuthLoginRequestBuilder()..update(updates))._build();

  _$AuthLoginRequest._({required this.email, required this.password})
      : super._();
  @override
  AuthLoginRequest rebuild(void Function(AuthLoginRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthLoginRequestBuilder toBuilder() =>
      AuthLoginRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthLoginRequest &&
        email == other.email &&
        password == other.password;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jc(_$hash, password.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthLoginRequest')
          ..add('email', email)
          ..add('password', password))
        .toString();
  }
}

class AuthLoginRequestBuilder
    implements Builder<AuthLoginRequest, AuthLoginRequestBuilder> {
  _$AuthLoginRequest? _$v;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  String? _password;
  String? get password => _$this._password;
  set password(String? password) => _$this._password = password;

  AuthLoginRequestBuilder() {
    AuthLoginRequest._defaults(this);
  }

  AuthLoginRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _email = $v.email;
      _password = $v.password;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthLoginRequest other) {
    _$v = other as _$AuthLoginRequest;
  }

  @override
  void update(void Function(AuthLoginRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthLoginRequest build() => _build();

  _$AuthLoginRequest _build() {
    final _$result = _$v ??
        _$AuthLoginRequest._(
          email: BuiltValueNullFieldError.checkNotNull(
              email, r'AuthLoginRequest', 'email'),
          password: BuiltValueNullFieldError.checkNotNull(
              password, r'AuthLoginRequest', 'password'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
