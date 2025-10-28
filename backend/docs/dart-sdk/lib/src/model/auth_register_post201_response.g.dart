// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_register_post201_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AuthRegisterPost201Response extends AuthRegisterPost201Response {
  @override
  final String? token;
  @override
  final AuthRegisterPost201ResponseUser? user;

  factory _$AuthRegisterPost201Response(
          [void Function(AuthRegisterPost201ResponseBuilder)? updates]) =>
      (AuthRegisterPost201ResponseBuilder()..update(updates))._build();

  _$AuthRegisterPost201Response._({this.token, this.user}) : super._();
  @override
  AuthRegisterPost201Response rebuild(
          void Function(AuthRegisterPost201ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthRegisterPost201ResponseBuilder toBuilder() =>
      AuthRegisterPost201ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthRegisterPost201Response &&
        token == other.token &&
        user == other.user;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, token.hashCode);
    _$hash = $jc(_$hash, user.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthRegisterPost201Response')
          ..add('token', token)
          ..add('user', user))
        .toString();
  }
}

class AuthRegisterPost201ResponseBuilder
    implements
        Builder<AuthRegisterPost201Response,
            AuthRegisterPost201ResponseBuilder> {
  _$AuthRegisterPost201Response? _$v;

  String? _token;
  String? get token => _$this._token;
  set token(String? token) => _$this._token = token;

  AuthRegisterPost201ResponseUserBuilder? _user;
  AuthRegisterPost201ResponseUserBuilder get user =>
      _$this._user ??= AuthRegisterPost201ResponseUserBuilder();
  set user(AuthRegisterPost201ResponseUserBuilder? user) => _$this._user = user;

  AuthRegisterPost201ResponseBuilder() {
    AuthRegisterPost201Response._defaults(this);
  }

  AuthRegisterPost201ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _token = $v.token;
      _user = $v.user?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthRegisterPost201Response other) {
    _$v = other as _$AuthRegisterPost201Response;
  }

  @override
  void update(void Function(AuthRegisterPost201ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthRegisterPost201Response build() => _build();

  _$AuthRegisterPost201Response _build() {
    _$AuthRegisterPost201Response _$result;
    try {
      _$result = _$v ??
          _$AuthRegisterPost201Response._(
            token: token,
            user: _user?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'user';
        _user?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'AuthRegisterPost201Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
