//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_register201_response_user.g.dart';

/// AuthRegister201ResponseUser
///
/// Properties:
/// * [id] 
/// * [email] 
/// * [role] 
@BuiltValue()
abstract class AuthRegister201ResponseUser implements Built<AuthRegister201ResponseUser, AuthRegister201ResponseUserBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'role')
  AuthRegister201ResponseUserRoleEnum? get role;
  // enum roleEnum {  ADMIN,  DRIVER,  RIDER,  };

  AuthRegister201ResponseUser._();

  factory AuthRegister201ResponseUser([void updates(AuthRegister201ResponseUserBuilder b)]) = _$AuthRegister201ResponseUser;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthRegister201ResponseUserBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthRegister201ResponseUser> get serializer => _$AuthRegister201ResponseUserSerializer();
}

class _$AuthRegister201ResponseUserSerializer implements PrimitiveSerializer<AuthRegister201ResponseUser> {
  @override
  final Iterable<Type> types = const [AuthRegister201ResponseUser, _$AuthRegister201ResponseUser];

  @override
  final String wireName = r'AuthRegister201ResponseUser';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthRegister201ResponseUser object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.id != null) {
      yield r'id';
      yield serializers.serialize(
        object.id,
        specifiedType: const FullType(String),
      );
    }
    if (object.email != null) {
      yield r'email';
      yield serializers.serialize(
        object.email,
        specifiedType: const FullType(String),
      );
    }
    if (object.role != null) {
      yield r'role';
      yield serializers.serialize(
        object.role,
        specifiedType: const FullType(AuthRegister201ResponseUserRoleEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthRegister201ResponseUser object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthRegister201ResponseUserBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'role':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AuthRegister201ResponseUserRoleEnum),
          ) as AuthRegister201ResponseUserRoleEnum;
          result.role = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthRegister201ResponseUser deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthRegister201ResponseUserBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class AuthRegister201ResponseUserRoleEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ADMIN')
  static const AuthRegister201ResponseUserRoleEnum ADMIN = _$authRegister201ResponseUserRoleEnum_ADMIN;
  @BuiltValueEnumConst(wireName: r'DRIVER')
  static const AuthRegister201ResponseUserRoleEnum DRIVER = _$authRegister201ResponseUserRoleEnum_DRIVER;
  @BuiltValueEnumConst(wireName: r'RIDER')
  static const AuthRegister201ResponseUserRoleEnum RIDER = _$authRegister201ResponseUserRoleEnum_RIDER;

  static Serializer<AuthRegister201ResponseUserRoleEnum> get serializer => _$authRegister201ResponseUserRoleEnumSerializer;

  const AuthRegister201ResponseUserRoleEnum._(String name): super(name);

  static BuiltSet<AuthRegister201ResponseUserRoleEnum> get values => _$authRegister201ResponseUserRoleEnumValues;
  static AuthRegister201ResponseUserRoleEnum valueOf(String name) => _$authRegister201ResponseUserRoleEnumValueOf(name);
}

