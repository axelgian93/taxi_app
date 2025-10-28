// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_register400_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AuthRegister400Response extends AuthRegister400Response {
  @override
  final String? error;

  factory _$AuthRegister400Response(
          [void Function(AuthRegister400ResponseBuilder)? updates]) =>
      (AuthRegister400ResponseBuilder()..update(updates))._build();

  _$AuthRegister400Response._({this.error}) : super._();
  @override
  AuthRegister400Response rebuild(
          void Function(AuthRegister400ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthRegister400ResponseBuilder toBuilder() =>
      AuthRegister400ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthRegister400Response && error == other.error;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, error.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthRegister400Response')
          ..add('error', error))
        .toString();
  }
}

class AuthRegister400ResponseBuilder
    implements
        Builder<AuthRegister400Response, AuthRegister400ResponseBuilder> {
  _$AuthRegister400Response? _$v;

  String? _error;
  String? get error => _$this._error;
  set error(String? error) => _$this._error = error;

  AuthRegister400ResponseBuilder() {
    AuthRegister400Response._defaults(this);
  }

  AuthRegister400ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _error = $v.error;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthRegister400Response other) {
    _$v = other as _$AuthRegister400Response;
  }

  @override
  void update(void Function(AuthRegister400ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthRegister400Response build() => _build();

  _$AuthRegister400Response _build() {
    final _$result = _$v ??
        _$AuthRegister400Response._(
          error: error,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
