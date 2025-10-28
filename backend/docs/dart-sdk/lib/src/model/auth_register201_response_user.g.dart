// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_register201_response_user.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const AuthRegister201ResponseUserRoleEnum
    _$authRegister201ResponseUserRoleEnum_ADMIN =
    const AuthRegister201ResponseUserRoleEnum._('ADMIN');
const AuthRegister201ResponseUserRoleEnum
    _$authRegister201ResponseUserRoleEnum_DRIVER =
    const AuthRegister201ResponseUserRoleEnum._('DRIVER');
const AuthRegister201ResponseUserRoleEnum
    _$authRegister201ResponseUserRoleEnum_RIDER =
    const AuthRegister201ResponseUserRoleEnum._('RIDER');

AuthRegister201ResponseUserRoleEnum
    _$authRegister201ResponseUserRoleEnumValueOf(String name) {
  switch (name) {
    case 'ADMIN':
      return _$authRegister201ResponseUserRoleEnum_ADMIN;
    case 'DRIVER':
      return _$authRegister201ResponseUserRoleEnum_DRIVER;
    case 'RIDER':
      return _$authRegister201ResponseUserRoleEnum_RIDER;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<AuthRegister201ResponseUserRoleEnum>
    _$authRegister201ResponseUserRoleEnumValues = BuiltSet<
        AuthRegister201ResponseUserRoleEnum>(const <AuthRegister201ResponseUserRoleEnum>[
  _$authRegister201ResponseUserRoleEnum_ADMIN,
  _$authRegister201ResponseUserRoleEnum_DRIVER,
  _$authRegister201ResponseUserRoleEnum_RIDER,
]);

Serializer<AuthRegister201ResponseUserRoleEnum>
    _$authRegister201ResponseUserRoleEnumSerializer =
    _$AuthRegister201ResponseUserRoleEnumSerializer();

class _$AuthRegister201ResponseUserRoleEnumSerializer
    implements PrimitiveSerializer<AuthRegister201ResponseUserRoleEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'ADMIN': 'ADMIN',
    'DRIVER': 'DRIVER',
    'RIDER': 'RIDER',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'ADMIN': 'ADMIN',
    'DRIVER': 'DRIVER',
    'RIDER': 'RIDER',
  };

  @override
  final Iterable<Type> types = const <Type>[
    AuthRegister201ResponseUserRoleEnum
  ];
  @override
  final String wireName = 'AuthRegister201ResponseUserRoleEnum';

  @override
  Object serialize(
          Serializers serializers, AuthRegister201ResponseUserRoleEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  AuthRegister201ResponseUserRoleEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      AuthRegister201ResponseUserRoleEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$AuthRegister201ResponseUser extends AuthRegister201ResponseUser {
  @override
  final String? id;
  @override
  final String? email;
  @override
  final AuthRegister201ResponseUserRoleEnum? role;

  factory _$AuthRegister201ResponseUser(
          [void Function(AuthRegister201ResponseUserBuilder)? updates]) =>
      (AuthRegister201ResponseUserBuilder()..update(updates))._build();

  _$AuthRegister201ResponseUser._({this.id, this.email, this.role}) : super._();
  @override
  AuthRegister201ResponseUser rebuild(
          void Function(AuthRegister201ResponseUserBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthRegister201ResponseUserBuilder toBuilder() =>
      AuthRegister201ResponseUserBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthRegister201ResponseUser &&
        id == other.id &&
        email == other.email &&
        role == other.role;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jc(_$hash, role.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthRegister201ResponseUser')
          ..add('id', id)
          ..add('email', email)
          ..add('role', role))
        .toString();
  }
}

class AuthRegister201ResponseUserBuilder
    implements
        Builder<AuthRegister201ResponseUser,
            AuthRegister201ResponseUserBuilder> {
  _$AuthRegister201ResponseUser? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  AuthRegister201ResponseUserRoleEnum? _role;
  AuthRegister201ResponseUserRoleEnum? get role => _$this._role;
  set role(AuthRegister201ResponseUserRoleEnum? role) => _$this._role = role;

  AuthRegister201ResponseUserBuilder() {
    AuthRegister201ResponseUser._defaults(this);
  }

  AuthRegister201ResponseUserBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _email = $v.email;
      _role = $v.role;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthRegister201ResponseUser other) {
    _$v = other as _$AuthRegister201ResponseUser;
  }

  @override
  void update(void Function(AuthRegister201ResponseUserBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthRegister201ResponseUser build() => _build();

  _$AuthRegister201ResponseUser _build() {
    final _$result = _$v ??
        _$AuthRegister201ResponseUser._(
          id: id,
          email: email,
          role: role,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
